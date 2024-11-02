import { RecentTransactions } from '../components/transactions/RecentTransactions';

const Dashboard: React.FC = () => {
  return (
    <div className="container py-5">
      <RecentTransactions />
    </div>
  );
};

export default Dashboard;
