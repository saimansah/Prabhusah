import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { GrievanceFormData, GrievanceTicket } from "@/types";

export interface GrievanceSubmissionResult {
  success: boolean;
  ticket?: GrievanceTicket;
  isSupabase: boolean;
  error?: string;
}

export interface GrievanceTrackingResult {
  found: boolean;
  ticket?: GrievanceTicket;
  source: "supabase" | "local" | "demo";
  error?: string;
}

const LOCAL_STORAGE_KEY = "prabhu_sah_tickets";

// Helper to format date
const formatDisplayDate = (dateStr?: string, language: "EN" | "NE" = "EN") => {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.toLocaleDateString(language === "EN" ? "en-US" : "ne-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Submit citizen grievance to Supabase janta_sunwai_tickets table,
 * with graceful local fallback if credentials or schema are pending.
 */
export async function submitGrievance(
  formData: GrievanceFormData,
  language: "EN" | "NE" = "NE"
): Promise<GrievanceSubmissionResult> {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const candidateCode = `AJP-RT-${new Date().getFullYear()}-${randomDigits}`;

  const defaultStatus = "Received";
  const defaultStatusNe = "सचिवालयमा दर्ता भयो";
  const defaultResolution = language === "EN" ? "3-5 Working Days" : "३–५ कार्यदिन भित्र";

  // Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("janta_sunwai_tickets")
        .insert({
          ticket_code: candidateCode,
          full_name: formData.fullName.trim(),
          phone: formData.phone.replace(/\D/g, "").slice(0, 10),
          municipality: formData.municipality.trim().slice(0, 50),
          ward: formData.ward.trim().slice(0, 10),
          category: formData.category,
          message: formData.message.trim().slice(0, 2000),
          status: defaultStatus,
          status_ne: defaultStatusNe,
          estimated_resolution: defaultResolution,
        })
        .select()
        .single();

      if (error) {
        console.warn("Supabase grievance insert error:", error.message);
        // Fall back to local storage if table hasn't been created yet
        return fallbackLocalSubmission(formData, candidateCode, defaultResolution, language, error.message);
      }

      if (data) {
        const ticket: GrievanceTicket = {
          id: data.ticket_code,
          fullName: data.full_name,
          phone: data.phone,
          municipality: data.municipality,
          ward: data.ward,
          category: data.category,
          message: data.message,
          status: data.status,
          statusNe: data.status_ne || defaultStatusNe,
          estimatedResolution: data.estimated_resolution || defaultResolution,
          createdAt: formatDisplayDate(data.created_at, language),
        };

        // Cache in local storage for quick access
        saveToLocalStorage(ticket);

        return {
          success: true,
          ticket,
          isSupabase: true,
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown network error";
      return fallbackLocalSubmission(formData, candidateCode, defaultResolution, language, msg);
    }
  }

  // If Supabase not yet configured, save locally
  return fallbackLocalSubmission(formData, candidateCode, defaultResolution, language);
}

/**
 * Track grievance status by ticket reference code from Supabase
 */
export async function trackGrievance(
  ticketCode: string,
  language: "EN" | "NE" = "NE"
): Promise<GrievanceTrackingResult> {
  const query = ticketCode.trim().toUpperCase();
  if (!query) {
    return { found: false, source: "demo", error: "Please provide a valid ticket code." };
  }

  // 1. Try Supabase lookup
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("janta_sunwai_tickets")
        .select("*")
        .ilike("ticket_code", query)
        .maybeSingle();

      if (!error && data) {
        return {
          found: true,
          source: "supabase",
          ticket: {
            id: data.ticket_code,
            fullName: data.full_name,
            phone: data.phone,
            municipality: data.municipality,
            ward: data.ward,
            category: data.category,
            message: data.message,
            status: data.status,
            statusNe: data.status_ne || "सचिवालयमा दर्ता भयो",
            estimatedResolution: data.estimated_resolution || "3-5 Working Days",
            createdAt: formatDisplayDate(data.created_at, language),
          },
        };
      }
    } catch (err) {
      console.warn("Supabase track lookup error:", err);
    }
  }

  // 2. Check local storage
  try {
    const stored: GrievanceTicket[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    const localFound = stored.find((t) => t.id.toUpperCase() === query);
    if (localFound) {
      return {
        found: true,
        source: "local",
        ticket: localFound,
      };
    }
  } catch (e) {
    console.error(e);
  }

  // 3. Fallback demo pattern for AJP-RT
  if (query.startsWith("AJP-RT")) {
    return {
      found: true,
      source: "demo",
      ticket: {
        id: query,
        fullName: language === "EN" ? "Registered Citizen" : "दर्ता भएका नागरिक",
        phone: "98XXXXXXXX",
        municipality: "Maulapur Municipality",
        ward: "3",
        category: "Agriculture & Free Irrigation Subsidies",
        message: "Under active review and coordination by Hon. Prabhu Sah's personal secretariat team.",
        createdAt: "2026-09-07",
        status: "Assigned to Secretariat Team",
        statusNe: "सचिवालय टोलीलाई जिम्मा लगाइएको",
        estimatedResolution: "48 Hours",
      },
    };
  }

  return {
    found: false,
    source: "demo",
    error:
      language === "EN"
        ? "No ticket found with this ID. Please verify your reference code (e.g. AJP-RT-2026-1001)."
        : "यो दर्ता नम्बरको कुनै विवरण भेटिएन। कृपया कोड पुनः जाँच गर्नुहोस्।",
  };
}

function fallbackLocalSubmission(
  formData: GrievanceFormData,
  ticketCode: string,
  estimatedResolution: string,
  language: "EN" | "NE",
  errorMessage?: string
): GrievanceSubmissionResult {
  const newTicket: GrievanceTicket = {
    ...formData,
    id: ticketCode,
    createdAt: formatDisplayDate(undefined, language),
    status: "Received",
    statusNe: "सचिवालयमा दर्ता भयो",
    estimatedResolution,
  };

  saveToLocalStorage(newTicket);

  return {
    success: true,
    ticket: newTicket,
    isSupabase: false,
    error: errorMessage,
  };
}

function saveToLocalStorage(ticket: GrievanceTicket) {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    stored.push(ticket);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
  } catch (e) {
    console.error(e);
  }
}
