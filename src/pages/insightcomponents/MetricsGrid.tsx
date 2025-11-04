import MetricCard from "./MetricCard";
import { FaUsers, FaRupeeSign } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlineWoman } from "react-icons/md";
interface MetricsGridProps {
  summary: any;
  metricLabels: Record<string, string>;
}

export default function MetricsGrid({ summary, metricLabels }: MetricsGridProps) {
  if (!summary) return null;

  const formatNum = (num?: number) =>
    typeof num === "number" && !isNaN(num) ? num.toLocaleString() : "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
      <MetricCard
        label={metricLabels.fundsAllocated}
        value={`₹${formatNum(summary.approvedLabourBudget)}`}
        icon={<FaRupeeSign />}
      />
      <MetricCard
        label={metricLabels.fundsUtilized}
        value={`₹${formatNum(summary.totalExpenditure)}`}
        icon={<FaRupeeSign />}
      />
      <MetricCard
        label={metricLabels.avgDaysPerHH}
        value={`${formatNum(summary.averageWageRate)}/day`}
        icon={<FaRupeeSign />}
      />
      <MetricCard
        label={metricLabels.households}
        value={formatNum(summary.totalHouseholdsWorked)}
        icon={<GiFamilyHouse />}
      />
      <MetricCard
        label={metricLabels.workers}
        value={formatNum(summary.totalIndividualsWorked)}
        icon={<FaUsers />}
      />
      <MetricCard
        label={metricLabels.womenParticipation}
        value={formatNum(summary.womenPersondays)}
        icon={<MdOutlineWoman />}
      />
      <MetricCard
        label={metricLabels.scParticipation}
        value={formatNum(summary.scPersondays)}
        icon={<FaUsers />}
      />
      <MetricCard
        label={metricLabels.stParticipation}
        value={formatNum(summary.stPersondays)}
        icon={<FaUsers />}
      />
      <MetricCard
        label={metricLabels.employmentRate}
        value={formatNum(summary.averageDaysEmployment)}
        icon={<GiFamilyHouse />}
      />
    </div>
  );
}
