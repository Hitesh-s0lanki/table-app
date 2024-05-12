"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Header from "./headre";
import Social from "./social";

interface CardWarpperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  showSocial?: boolean;
  label: string;
}

const CardWrapper: React.FC<CardWarpperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  showSocial,
  label,
}) => {
  return (
    <Card className="w-full border-0 p-5">
      <CardHeader>
        <Header label={label} headerLabel={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          {" "}
          <Social />{" "}
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
