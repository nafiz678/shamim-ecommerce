import {
  FastDeliveryIcon,
  MoneyBackIcon,
  SecurePaymentIcon,
  SupportIcon,
} from '../../../components/icons/Icon';
import type { FeatureItemProps } from '../../../lib/type';

export default function FeatureBar() {
  const items: FeatureItemProps[] = [
    {
      title: 'FASTED DELIVERY',
      subtitle: 'Delivery in 24/H',
      icon: <FastDeliveryIcon />,
    },
    {
      title: '24 HOURS RETURN',
      subtitle: '100% money-back guarantee',
      icon: <MoneyBackIcon />,
    },
    {
      title: 'SECURE PAYMENT',
      subtitle: 'Your money is safe',
      icon: <SecurePaymentIcon />,
    },
    {
      title: 'SUPPORT 24/7',
      subtitle: 'Live contact/message',
      icon: <SupportIcon />,
    },
  ];

  return (
    <div className="w-full pt-6 pb-18">
      <div className="mx-auto grid gap-2 md:grid-cols-4 grid-cols-2 w-full overflow-hidden rounded-lg border border-[#d9d9d9] py-5 ">
        {items.map((item) => (
          <FeatureCard item={item} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ item }: { item: FeatureItemProps }) {
  return (
    <div
      key={item.title}
      className={`flex flex-1 items-center justify-center gap-5 px-4 border-r border-[#d9d9d9]`}
    >
      <div className="flex items-center justify-center lg:size-8 size-6">
        {item.icon}
      </div>

      <div className="">
        <h3 className="md:text-xs text-xxs tracking-[0.02em] leading-none uppercase">
          {item.title}
        </h3>
        <p className="mt-1 text-xxs text-foreground/60 truncate">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
