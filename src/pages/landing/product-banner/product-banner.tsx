export default function ProductBanner() {
  return (
    <section className="w-full bg-background pt-6 font-sans text-foreground">
      <div className="mx-auto grid grid-cols-1 gap-x-5 gap-y-8 px-4 sm:grid-cols-2 xl:grid-cols-4 xl:px-0">
        {columns.map((column) => (
          <div key={column.title} className="min-w-0">
            <h2 className="mb-4 text-xs font-semibold">{column.title}</h2>

            <div className="grid gap-y-3">
              {column.items.map((item) => (
                <ProductCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ item }: ProductCardProps) {
  return (
    <article className="flex items-center rounded-[3px] border border-border pl-2.5 pr-1 py-2">
      <div className="mr-4 flex shrink-0 items-center justify-center overflow-hidden ">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="max-h-18 max-w-15 object-contain"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5 w-fit">
        <h3 className="line-clamp-2 text-xs font-normal w-full">{item.name}</h3>
        <p className="text-xs font-semibold text-text-primary">$1,500</p>
      </div>
    </article>
  );
}

export type ProductItem = {
  name: string;
  image: string;
};

export type ColumnProp = {
  title: string;
  items: ProductItem[];
};

const columns: ColumnProp[] = [
  {
    title: 'FLASH SALE TODAY',
    items: [
      {
        name: 'Bose Sport Earbuds -Wireless Earphones-Bluetooth In Ear...',
        image: '/placeholder.svg',
      },
      {
        name: 'Simple Mobile 4G LTE Prepaid Smartphone',
        image: '/placeholder.svg',
      },
      {
        name: '4K UHD LED Smart TV with Chromecast Built-in',
        image: '/placeholder.svg',
      },
    ],
  },
  {
    title: 'BEST SELLERS',
    items: [
      {
        name: 'Samsung Electronics Samsung Galaxy S21 5G',
        image: '/placeholder.svg',
      },
      {
        name: 'Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone',
        image: '/placeholder.svg',
      },
      {
        name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
        image: '/placeholder.svg',
      },
    ],
  },
  {
    title: 'TOP RATED',
    items: [
      {
        name: 'Portable Washing Machine, 11lbs capacity Model 18NMF...',
        image: '/placeholder.svg',
      },
      {
        name: 'Sony DSCHX8 High Zoom Point & Shoot Camera',
        image: '/placeholder.svg',
      },
      {
        name: 'Dell Optiplex 7000x7480 All-in-One Computer Monitor',
        image: '/placeholder.svg',
      },
    ],
  },
  {
    title: 'NEW ARRIVAL',
    items: [
      {
        name: 'TOZO T6 True Wireless Earbuds Bluetooth Headpho...',
        image: '/placeholder.svg',
      },
      {
        name: 'JBL FLIP 4 -Waterproof Portable Bluetooth Speaker...',
        image: '/placeholder.svg',
      },
      {
        name: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smar...',
        image: '/placeholder.svg',
      },
    ],
  },
];

type ProductCardProps = {
  item: ProductItem;
};
