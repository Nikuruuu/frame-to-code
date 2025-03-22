import { AiModelList } from "@/data/Constant";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Code, Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { toast } from "sonner";

// Import the Alert Dialog components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DesignCard({ item, onDelete }: { item: any; onDelete?: () => void }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const modelObj = item && AiModelList.find((i) => i.name === item?.model);

  const handleViewCode = () => {
    setIsNavigating(true);
    router.push(`/view-code/${item?.uid}`);
  };

  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click
    e.preventDefault(); // Prevent default behavior
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.post("/api/delete-wireframe", {
        uid: item.uid,
        imageUrl: item.imageUrl,
      });

      if (response.data.success) {
        toast.success("Design deleted successfully");
        if (onDelete) onDelete(); // Call the parent's onDelete callback to refresh the list
      } else {
        throw new Error(response.data.error || "Failed to delete design");
      }
    } catch (error) {
      console.error("Error deleting design:", error);
      toast.error("Failed to delete design. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // Skeleton version of the card
  if (!item) {
    return (
      <div className="p-3 sm:p-5 border rounded-lg">
        <Skeleton className="w-full h-[150px] sm:h-[200px] rounded-lg" />
        <div className="mt-2">
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center mt-4">
            <Skeleton className="h-8 sm:h-10 w-full sm:w-28 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-full sm:w-28 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-3 sm:p-5 border rounded-lg">
        <div className="relative">
          <Image
            src={item.imageUrl}
            alt={"image"}
            width={300}
            height={200}
            className="w-full h-[150px] sm:h-[200px] object-cover bg-white rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-8 h-8 opacity-80 hover:opacity-100"
            onClick={openDeleteDialog}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-2">
          <h2 className="line-clamp-3 text-gray-400 text-xs sm:text-sm">
            {item.description}
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center mt-4">
            <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-gray-50 rounded-full w-full sm:w-auto">
              {modelObj && (
                <Image
                  src={modelObj?.icon}
                  alt={modelObj?.modelName ?? ""}
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              )}
              <h2 className="text-xs sm:text-sm truncate">{modelObj?.name}</h2>
            </div>
            <Button
              onClick={handleViewCode}
              disabled={isNavigating}
              className="w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10"
            >
              {isNavigating ? (
                <div className="flex items-center">
                  <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 rounded-full mr-1 sm:mr-2" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <Code className="w-4 h-4 mr-1 sm:mr-2" />
                  View Code
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              design and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DesignCard;
