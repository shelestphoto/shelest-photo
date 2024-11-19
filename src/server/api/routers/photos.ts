import { z } from "zod"; //zod-библиотека, которая работает с типами
import { eq } from "drizzle-orm/expressions";
import {
  createTRPCRouter, //создают роутер и процедуры
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { photos, gallery } from "~/server/db/schema";
import { get } from "http";

export const photosRouter = createTRPCRouter({
  createPhoto: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        url: z.string().min(1),
        galleryId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(photos).values({
        name: input.name,
        url: input.url,
        galleryId: input.galleryId,
        createdById: ctx.session.user.id,
      });
    }),

  deletePhoto: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(photos).where(eq(photos.id, input.id));
    }),

  getAllPhotos: publicProcedure.query(async ({ ctx }) => {
    const photos = await ctx.db.query.photos.findMany();
    return photos;
  }),

  getPhotoByGalleryId: publicProcedure
    .input(z.object({ galleryId: z.number() }))
    .query(async ({ ctx, input }) => {
      const photosByGalleryId = await ctx.db.query.photos.findMany({
        where: eq(photos.galleryId, input.galleryId),
      });
      return photosByGalleryId;
    }),

  getPhotoById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const photoById = await ctx.db.query.photos.findFirst({
        where: eq(photos.id, input.id),
      });
      return photoById;
    }),

  getAllGalleries: publicProcedure.query(async ({ ctx }) => {
    const galleries = await ctx.db.query.gallery.findMany({
      with: { photos: true },
    });
    return galleries;
  }),

  getGalleryById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const galleryById = await ctx.db.query.gallery.findFirst({
        where: eq(gallery.id, input.id),
        with: { photos: true },
      });
      return galleryById;
    }),

  createGallery: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(gallery).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  deleteGallery: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(gallery).where(eq(gallery.id, input.id));
    }),
});
