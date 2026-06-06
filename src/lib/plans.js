export const OWNER_PLANS = {
  trial: {
    key: "trial",
    name: "7 Days Free Trial",
    price: 0,
    durationDays: 7,
    channels: 3,
    staffPerOwner: 0,
    clients: 0,

    features: [
      "3 Channel Connect",
      "CRM Access",
      "Manual Lead Entry",
      "Social Post Scheduler",
      "Google Ads Data",
      "Meta Ads Data",
      "Basic Dashboard",
    ],
  },

  starter: {
    key: "starter",
    name: "Owner Starter",
    price: 499,
    durationDays: 30,
    channels: 3,
    staffPerOwner: 3,
    clients: 0,

    features: [
      "3 Channel Connect",
      "CRM Access",
      "Manual Lead Entry",
      "Social Post Scheduler",
      "Google Ads Data",
      "Meta Ads Data",
      "Basic Reports",
      "3 Staff Accounts",
    ],
  },

  growth: {
    key: "growth",
    name: "Owner Growth",
    price: 999,
    durationDays: 30,
    channels: 3,
    staffPerOwner: 5,
    clients: 0,

    features: [
      "Everything in Starter",
      "5 Staff Accounts",
      "Lead Assignment",
      "WhatsApp Reports",
      "Advanced Analytics",
      "Campaign Reports",
    ],
  },

  business_pro: {
    key: "business_pro",
    name: "Owner Business Pro",
    price: 2999,
    durationDays: 30,
    channels: 3,
    staffPerOwner: 10,
    clients: 0,

    features: [
      "Everything in Growth",
      "10 Staff Accounts",
      "Advanced CRM",
      "Team Management",
      "AI Assistant",
      "Automation Tools",
      "Priority Support",
    ],
  },
};

export const AGENCY_PLANS = {
  trial: {
    key: "trial",
    name: "7 Days Free Trial",
    price: 0,
    durationDays: 7,
    clients: 1,
    staffPerClient: 0,
    totalStaff: 0,

    features: [
      "CRM Access",
      "Social Post Scheduler",
      "Manual Lead Entry",
      "Basic Dashboard",
      "Basic Reports",
    ],
  },

  agency_starter: {
    key: "agency_starter",
    name: "Agency Starter",
    price: 9999,
    durationDays: 30,
    clients: 10,
    staffPerClient: 3,
    totalStaff: 30,

    features: [
      "Up to 10 Clients",
      "3 Staff per Client",
      "CRM Access",
      "Manual Lead Entry",
      "Social Post Scheduler",
      "Google Ads Data",
      "Meta Ads Data",
      "Client Reports",
    ],
  },

  agency_growth: {
    key: "agency_growth",
    name: "Agency Growth",
    price: 19999,
    durationDays: 30,
    clients: 15,
    staffPerClient: 3,
    totalStaff: 45,

    features: [
      "Up to 15 Clients",
      "3 Staff per Client",
      "Everything in Agency Starter",
      "Advanced Analytics",
      "Team Reports",
      "Lead Assignment",
      "Client Wise Dashboard",
    ],
  },

  agency_business: {
    key: "agency_business",
    name: "Agency Business",
    price: 50000,
    durationDays: 30,
    clients: 25,
    staffPerClient: 5,
    totalStaff: 125,

    features: [
      "Up to 25 Clients",
      "5 Staff per Client",
      "Advanced CRM",
      "White Label Reports",
      "Automation Tools",
      "Priority Support",
    ],
  },

  agency_enterprise: {
    key: "agency_enterprise",
    name: "Agency Enterprise",
    price: 100000,
    durationDays: 30,
    clients: 50,
    staffPerClient: 5,
    totalStaff: 250,

    features: [
      "Up to 50 Clients",
      "5 Staff per Client",
      "Everything in Agency Business",
      "Enterprise Dashboard",
      "API Access",
      "Dedicated Support",
      "Custom Branding",
    ],
  },
};