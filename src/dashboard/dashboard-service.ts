export class DashboardService {
   getAgeInMonths(dobString: string) {
    const parts = dobString.split("/");
    const dob = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Parse the dob string into a Date object
    const today = new Date();
    let months = (today.getFullYear() - dob.getFullYear()) * 12;
    months -= dob.getMonth();
    months += today.getMonth();
    return months;
  }
}
