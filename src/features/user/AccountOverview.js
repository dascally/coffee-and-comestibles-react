import Rewards from './Rewards';
import SavedOrders from './SavedOrders';
import SavedPayments from './SavedPayments';
import ChangeInfo from './ChangeInfo';

export default function AccountOverview() {
  return (
    <>
      <Rewards />
      <SavedOrders />
      <SavedPayments />
      <ChangeInfo />
    </>
  );
}
