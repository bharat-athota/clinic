import { Location } from "src/app/components/locations/locations.model";

export interface AppState {
    locations: Location[];
    selectedIndex: number | null;
}
  
  