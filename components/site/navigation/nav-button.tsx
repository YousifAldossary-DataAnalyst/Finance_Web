import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = { href: string; label: string; isActive?: boolean };

const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "full-width lg:w-auto justify-between font-normal hover:bg-primary/60 gap-4 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-primary/90 focus-:bg-primary/90 transition",
        isActive ? "bg-primary/90 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
