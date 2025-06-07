export interface LocationDetails {
  location: Location;
}

export interface Location {
  address: string[];
  adminDistrict: string | undefined[];
  adminDistrictCode: any[];
  city: string[];
  country: string[];
  countryCode: string[];
  displayName: string[];
  displayContext: string | undefined[];
  ianaTimeZone: string[];
  latitude: number[];
  locale: Locale[];
  longitude: number[];
  neighborhood: any[];
  placeId: string[];
  postalCode: string | undefined[];
  postalKey: string | undefined[];
  disputedArea: boolean[];
  disputedCountries: string[] | undefined[];
  disputedCountryCodes: string[] | undefined[];
  disputedCustomers: any[][] | undefined[];
  disputedShowCountry: boolean[][];
  iataCode: string | undefined[];
  icaoCode: string | undefined[];
  locId: string[];
  locationCategory: any[];
  pwsId: string | undefined[];
  type: string[];
}

export interface Locale {
  locale1?: string;
  locale2: string;
  locale3?: string;
  locale4: any;
}
