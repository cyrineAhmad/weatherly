export interface LocationDetails {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone: string;
  population?: number;
  postcodes?: string[];
  country_id: number;
  country: string;
}