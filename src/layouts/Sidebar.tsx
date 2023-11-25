import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  History,
  HomeIcon,
  Library,
  ListVideo,
  Music2,
  PlaySquare,
  Radio,
  Repeat,
  ShoppingBag,
} from 'lucide-react';
import { Children, ElementType, ReactNode, useState } from 'react';
import Button, { buttonStyles } from '../components/Button';
import { twMerge } from 'tailwind-merge';
import { playlists, subscriptions } from '../data/sidebar';

const Sidebar = () => {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <SmallSidebarItem IconOrImgUrl={HomeIcon} title="Home" url="/" />
        <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          IconOrImgUrl={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem
          IconOrImgUrl={Library}
          title="Library"
          url="/library"
        />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 hidden lg:flex">
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={HomeIcon}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5} title="You">
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              IconOrImgUrl={ListVideo}
              key={playlist.id}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5} title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection visibleItemCount={5} title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title={'Trending'}
            url={'/trending'}
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title={'Shopping'}
            url={'/shopping'}
          />
          <LargeSidebarItem
            IconOrImgUrl={Music2}
            title={'Music'}
            url={'/music'}
          />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title={'Movies & TV'}
            url={'/movies-tv'}
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title={'Live'} url={'/live'} />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  IconOrImgUrl: ElementType;
  title: string;
  url: string;
};
function SmallSidebarItem({ IconOrImgUrl, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'py-4 px-1 flex flex-col items-center rounded-lg gap-1 '
      )}
    >
      <IconOrImgUrl className="w-6 h-6" />

      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant={'ghost'}
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? 'font-bold bg-neural 100 hover:bg-secondary' : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

export default Sidebar;
