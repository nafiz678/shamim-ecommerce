import type { FeatureItemProps } from '../../../lib/type';

export default function FeatureBar() {
  const items: FeatureItemProps[] = [
    {
      title: 'FASTED DELIVERY',
      subtitle: 'Delivery in 24/H',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35 27.703V12.297a1.27 1.27 0 0 0-.64-1.094L20.61 3.47a1.22 1.22 0 0 0-1.22 0L5.64 11.203A1.27 1.27 0 0 0 5 12.297v15.406a1.27 1.27 0 0 0 .64 1.094l13.75 7.734a1.22 1.22 0 0 0 1.22 0l13.75-7.734a1.27 1.27 0 0 0 .64-1.094"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.656 23.828v-8.125L12.5 7.343"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34.828 11.656 20.141 20 5.17 11.656M20.14 20 20 36.688"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      title: '24 HOURS RETURN',
      subtitle: '100% money-back guarantee',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 8.75v8.61c0 6.203 4.969 11.343 11.172 11.39A11.25 11.25 0 0 0 31.25 17.5V8.75A1.25 1.25 0 0 0 30 7.5H10a1.25 1.25 0 0 0-1.25 1.25M15 35h10m-5-6.25V35"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30.969 20H32.5a5 5 0 0 0 5-5v-2.5a1.25 1.25 0 0 0-1.25-1.25h-5M9.063 20H7.484a5 5 0 0 1-5-5v-2.5a1.25 1.25 0 0 1 1.25-1.25h5"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'SECURE PAYMENT',
      subtitle: 'Your money is safe',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35 8.75H5c-.69 0-1.25.56-1.25 1.25v20c0 .69.56 1.25 1.25 1.25h30c.69 0 1.25-.56 1.25-1.25V10c0-.69-.56-1.25-1.25-1.25m-8.75 17.5h5m-12.5 0h2.5M3.75 15.14h32.5"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'SUPPORT 24/7',
      subtitle: 'Live contact/message',
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.234 21.25h-5a2.5 2.5 0 0 0-2.5 2.5V30a2.5 2.5 0 0 0 2.5 2.5h2.5a2.5 2.5 0 0 0 2.5-2.5zm0 0a15 15 0 0 0-15.125-15A15 15 0 0 0 5 21.25V30a2.5 2.5 0 0 0 2.5 2.5H10a2.5 2.5 0 0 0 2.5-2.5v-6.25a2.5 2.5 0 0 0-2.5-2.5H5"
            stroke="#191c1f"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full pt-6 pb-18">
      <div className="mx-auto flex w-full flex-col overflow-hidden rounded-lg border border-[#d9d9d9] sm:flex-row py-5 ">
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
      className={`flex flex-1 items-center justify-center gap-5 px-4 border-r border-[#d9d9d9] w-2`}
    >
      <div className="flex items-center justify-center w-8">
        {item.icon}
      </div>

      <div className="">
        <h3 className="text-xs tracking-[0.02em] leading-none uppercase">
          {item.title}
        </h3>
        <p className="mt-1 text-[10px] text-foreground/60 truncate">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
