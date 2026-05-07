import {
  FastDeliveryIcon,
  MoneyBackIcon,
  SecurePaymentIcon,
  SupportIcon,
} from '../../../components/icons/Icon';
import type { FeatureItemProps } from '../../../lib/types';

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
    <section className="w-full py-6 lg:pb-18">
      <div className="mx-auto grid w-full grid-cols-1 overflow-hidden rounded-lg border border-border py-2 sm:grid-cols-2 sm:py-4 md:grid-cols-4 md:py-5">
        {items.map((item, index) => (
          <FeatureCard
            key={item.title}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  item,
  isLast,
}: {
  item: FeatureItemProps;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 sm:justify-center sm:gap-4 md:gap-5 md:py-0 ${
        isLast ? '' : 'border-b border-border sm:border-b-0 sm:border-r'
      }`}
    >
      <div className="flex size-6 shrink-0 items-center justify-center lg:size-8">
        {item.icon}
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-xs leading-none tracking-wide uppercase">
          {item.title}
        </h3>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
