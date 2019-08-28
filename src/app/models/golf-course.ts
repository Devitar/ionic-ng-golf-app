export interface GolfCourse {
    name: string;
    id: number;
    image: string;
    hole_count: number;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    holes: Array<any>;
    website: string;
}
