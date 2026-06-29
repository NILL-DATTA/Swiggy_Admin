
export interface Restaurant {
    _id: string;
    restaurantName: string;
    ownerName: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
}

export interface RestaurantState {
    loading: boolean;
    error: string | null;
    restaurants: Restaurant[];
    approvedRestaurantlist:[]
}
