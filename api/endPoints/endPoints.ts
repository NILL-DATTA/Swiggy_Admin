
export const endPoints = {
    auth: {
        signIn: "/auth/login",
    },

    restaurant: {
        pendinglist: "/admin/restaurants/pending",
        updateApplicationStatus: (id: string) => `/applications/${id}/status`,

        approvedlist: "/admin/restaurants/approved"
    }

};

const endPointsUrl = [
    endPoints.auth.signIn,
    endPoints.restaurant.pendinglist,
    endPoints.restaurant.updateApplicationStatus,
    endPoints.restaurant.approvedlist
];
