import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ThreeDots = ({
  title1,
  title2,
  title3,
  viewCourse,
  onClick1,
  onclick2,
  onclick3,
  className1,
  className2,
  className3,
}: {
  title1?: string;
  title2?: string;
  title3?: string;
  viewCourse?: JSX.Element;
  onClick1?: () => void;
  onclick2?: () => void;
  onclick3?: () => void;
  className1?: string;
  className2?: string;
  className3?: string;
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/*  this is for view course only */}
          {<DropdownMenuItem>{viewCourse && viewCourse}</DropdownMenuItem>}

          {/* write now this is for complete courses */}
          {title1 && (
            <DropdownMenuItem>
              <button
                onClick={onClick1}
                className={cn(`flex items-center w-full px-4 py-2 text-sm font-medium text-left
                     text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 
                     focus:outline-none dark:text-white 
                     focus:ring-gray-50 dark:bg-gray-800
                      dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${className1}`)}
              >
                {title1}
              </button>
            </DropdownMenuItem>
          )}

          {title2 && (
            <DropdownMenuItem>
              <button
                onClick={onclick2}
                className={cn(`flex items-center w-full px-4 py-2 text-sm font-medium text-left
                    text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 
                    focus:outline-none dark:text-white 
                    focus:ring-gray-50 dark:bg-gray-800
                     dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${className2}`)}
              >
                {title2}
              </button>
            </DropdownMenuItem>
          )}

          {title3 && (
            <DropdownMenuItem>
              <button
                onClick={onclick3}
                className={cn(`flex items-center w-full px-4 py-2 text-sm font-medium text-left
                    text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 
                    focus:outline-none dark:text-white 
                    focus:ring-gray-50 dark:bg-gray-800
                     dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${className3}`)}
              >
                {title3}
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThreeDots;
