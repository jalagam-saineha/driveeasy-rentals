import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { BookingResult, BookingView, CreateBookingInput } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useMyBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BookingView[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.myBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBookings() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BookingView[]>({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<BookingResult, Error, CreateBookingInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBooking(input);
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        queryClient.invalidateQueries({ queryKey: ["myBookings"] });
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        toast.success(`Booking confirmed! Ref: ${result.ok.referenceNumber}`);
      } else {
        toast.error(result.err);
      }
    },
    onError: (e) => toast.error(e.message),
  });
}

export function useCancelBooking() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.cancelBooking(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      queryClient.invalidateQueries({ queryKey: ["allBookings"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Booking cancelled");
    },
    onError: (e) => toast.error(e.message),
  });
}
