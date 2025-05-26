export namespace RouteHelper {
  type RouteInfo = {
    route: string;
    params?: Record<string, string>;
  };

  export const home = "/home";
  export const myBookings = "/home/book/mybooking";
  export const bookingResourceCategory = "/home/book/category";
  export const bookingResource = "/home/book/resource";
  export const bookingTime = "/home/book/timeslot";
  export const bookingDetails = "/home/book/details";
  export const bookingConfirmation = "/home/book/confirmation";
  export const auth = "/auth";

  export function getRouteInfo({ route, params }: RouteInfo): string {
    let path = route;
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value) {
          path = path + (path.includes("?") ? "&" : "?") + key + "=" + value;
        }
      });
    }

    return path;
  }
}
