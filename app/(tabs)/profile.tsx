import { ProfileScreen } from '@/screens/ProfileScreen';
import { useUser } from '@/context/UserContext';

export default function ProfileRoute() {
  const { isKycVerified } = useUser();
  return <ProfileScreen kycVerified={isKycVerified} />;
}
