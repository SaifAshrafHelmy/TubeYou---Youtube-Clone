import { ArrowLeft, Bell, Menu, Mic, Search, User, Video } from 'lucide-react';
import logo from '../assets/yt-logo.png';
import Button from '../components/Button';
import { useState } from 'react';
import { useSidebarContext } from '../context/SidebarContext';

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex justify-between gap-10 lg:gap-20 pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(false)}
          type="button"
          size={'icon'}
          variant={'ghost'}
          className={`flex-shrink-0 ${
            showFullWidthSearch ? 'flex md:hidden' : 'hidden'
          }`}
        >
          <ArrowLeft />
        </Button>

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          size={'icon'}
          variant={'default'}
          className="flex-shrink-0"
        >
          <Mic />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? 'hidden md:flex' : 'flex'
        }`}
      >
        <Button
          size={'icon'}
          variant={'ghost'}
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button size={'icon'} variant={'ghost'} className="md:hidden">
          <Mic />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <Video />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <Bell />
        </Button>
        <Button size={'icon'} variant={'ghost'}>
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`items-center gap-4 flex-shrink-0 ${
        hidden ? 'hidden md:flex' : 'flex'
      }`}
    >
      <Button onClick={toggle} variant={'ghost'} size={'icon'}>
        <Menu />
      </Button>
      <a href="#">
        <img src={logo} alt="TubeYou Logo" className="h-6" />
      </a>
    </div>
  );
}
export default PageHeader;
