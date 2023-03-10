import { type Plant } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef } from "react";

export type PlantProps = Plant & {
  createdBy: {
    name: string | null;
  };
};

const CreateButton = dynamic(() => import("./CreateButton"));

const EditButton = dynamic(() => import("./EditButton"));

const DeleteButton = dynamic(() => import("./DeleteButton"));

export const PlantView = ({ plants }: { plants: PlantProps[] }) => {
  const router = useRouter();
  const pendingDeleteCountRef = useRef(0);
  const siteDiaryId = router.query.siteDiaryId as string;
  return (
    <div className="flex justify-between">
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <span className="mr-4">{plant.type}</span>
            <span className="mr-4">{plant.amount}</span>
            <span className="mr-4">{plant.createdBy.name}</span>
            <EditButton plant={plant} siteDiaryId={siteDiaryId} />
            <DeleteButton
              plantId={plant.id}
              siteDiaryId={siteDiaryId}
              pendingDeleteCountRef={pendingDeleteCountRef}
            />
          </li>
        ))}
      </ul>
      <CreateButton siteDiaryId={siteDiaryId} />
    </div>
  );
};
