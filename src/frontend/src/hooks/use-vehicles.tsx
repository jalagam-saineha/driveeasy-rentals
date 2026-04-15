import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleView,
} from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useVehicles() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<VehicleView[]>({
    queryKey: ["vehicles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVehicles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVehicle(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<VehicleView | null>({
    queryKey: ["vehicle", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getVehicle(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddVehicle() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<VehicleView, Error, CreateVehicleInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.addVehicle(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle added successfully");
    },
    onError: (e) => toast.error(e.message),
  });
}

export function useUpdateVehicle() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<VehicleView, Error, UpdateVehicleInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateVehicle(input);
    },
    onSuccess: (v) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", v.id.toString()] });
      toast.success("Vehicle updated");
    },
    onError: (e) => toast.error(e.message),
  });
}

export function useDeleteVehicle() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteVehicle(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle deleted");
    },
    onError: (e) => toast.error(e.message),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterAdmin() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.registerAdmin();
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      toast.success("Admin registered successfully");
    },
    onError: (e) => toast.error(e.message),
  });
}
