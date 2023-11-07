import BankDetails from "@/components/form/bank";
import ProfileDetails from "@/components/form/profile";

export default function Page() {
  return (
    <div className="min-h-screen md:pl-64 w-full">
      <ProfileDetails />
      <BankDetails />
    </div>
  );
}
