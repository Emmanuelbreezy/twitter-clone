"use client";
import React, { FC, Fragment, useCallback } from "react";
import { Ellipsis, LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

interface PropsType {
  label?: string;
  href?: string;
  icon?: LucideIcon;
  isUser?: boolean;
  userInfo?: {
    profileImgUrl: string;
    username: string;
    fullname: string;
  };
  onClick?: () => void;
}

const SidebarItem: FC<PropsType> = (props) => {
  const {
    userInfo = null,
    isUser = false,
    label,
    icon: Icon,
    onClick,
    href,
  } = props;
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) onClick();

    if (href) {
      router.push(href);
    }
  }, [router, onClick, href]);

  return (
    <div
      role="button"
      onClick={handleClick}
      className="flex w-full flex-row items-center"
    >
      <div
        className="relative rounded-full h-14 w-14 flex items-center justify-center
      p-3 hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      lg:hidden
      "
      >
        {isUser && userInfo ? (
          <Avatar>
            <AvatarImage
              src={userInfo?.profileImgUrl}
              className="object-cover"
            />
            <AvatarFallback className="font-bold text-[18px]">
              {userInfo?.fullname?.[0]}
            </AvatarFallback>
          </Avatar>
        ) : (
          <>
            {href === "/premium" && <Logo width="28px" height="28px" />}

            {Icon && (
              <Icon size={28} className="text-[#14171A] dark:text-white" />
            )}
          </>
        )}
      </div>
      <div
        className="
        relative 
        hidden 
        lg:flex 
        gap-4 
        p-3
        py-3
        w-full
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        items-center
        "
      >
        {isUser && userInfo ? (
          <div className="flex flex-row w-full gap-3">
            <Avatar>
              <AvatarImage
                src={userInfo?.profileImgUrl}
                className="object-cover"
              />
              <AvatarFallback className="font-bold text-[18px]">
                {userInfo?.fullname?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-row w-full justify-between">
              <div className="flex-1 text-left">
                <h3 className="text-[16px] text-[#14171A] dark:text-white block max-w-[150px] truncate font-bold leading-tight">
                  {userInfo?.fullname}
                </h3>
                <p className="!text-[#959fa8] text-[15px] block max-w-[120px] truncate font-medium">
                  @{userInfo?.username}
                </p>
              </div>
              <Ellipsis />
            </div>
          </div>
        ) : (
          <Fragment>
            {href === "/premium" && <Logo width="24px" height="24px" />}
            {Icon && (
              <Icon size={24} className="text-[#14171A] dark:text-white" />
            )}
            <span className="hidden lg:block text-[#14171A] dark:text-white text-xl">
              {label}
            </span>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SidebarItem;
