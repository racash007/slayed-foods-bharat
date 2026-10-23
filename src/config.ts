const configuredDistributorFormUrl = import.meta.env.VITE_DISTRIBUTOR_GOOGLE_FORM_URL?.trim();

export const distributorFormUrl = configuredDistributorFormUrl
  || 'https://docs.google.com/forms/d/e/1FAIpQLSdXhCMS8JkCC2k9EzVpAZutsiTDlPJFwmlrTGzvxGxsIBRbog/viewform?embedded=true';
