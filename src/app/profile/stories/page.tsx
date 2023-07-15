"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/ArrowLeft";
import StoryCard from "@/components/StoryCard";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toast } from "@/components/Toast";

interface CustomUser extends Session {
  user: {
    id?: string;
    name?: string | null;
    username?: string;
    points?: number;
    rating?: number;
    tier?: number;
    avatar?: number;
  };
}

const profileStory: React.FC = () => {
  let { data: session } = useSession({
    required: true,
  }) as { data: CustomUser | null };
  const [cardData, setCardData] = useState<any[] | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [errorStatus, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/getData/getProfileStory");
      const data = await res.json();
      setCardData(data.stories);
    } catch (error) {
      console.error("Failed to fetch stories", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const filteredCards = cardData?.filter(
    (card: any) => card.userId === session?.user?.id
  );

  return (
    <div className="flex flex-col p-7 pl-12 min-w-0">
      <Toast
        message={toastMessage}
        visible={toastVisible}
        error={errorStatus}
      />
      <div className="flex flex-col relative min-w-0">
        <div className="flex justify-between items-center">
          <Link
            href={"/profile"}
            className="flex items-center space-x-2 bg-[#0D90FF] p-2 pl-3 pr-3 rounded-lg"
          >
            <ArrowLeftIcon width={22} height={8} color={"white"} />
            <button className="text-white text-[14px]">Back</button>
          </Link>
          <div className="flex items-center pb-6">
            <p className="text-2xl font-bold pr-[80px]">Your Story</p>
          </div>
        </div>

        <div className="flex flex-wrap min-w-0">
          {filteredCards?.map((card: any, index: number) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <StoryCard
                id={card._id}
                story={card.story}
                category={card.category}
                searchQuery=""
                storyType={card.storyType}
                schedules={card.schedules}
                userId={card.userId}
                activation={card.activation}
                username={session?.user?.username}
                avatar={session?.user?.avatar}
                createdAt={card.createdAt}
                refetch={fetchData}
                setToastMessage={setToastMessage}
                setToastVisible={setToastVisible}
                setError={setError}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default profileStory;
