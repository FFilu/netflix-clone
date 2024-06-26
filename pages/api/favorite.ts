import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const exisitingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!exisitingMovie) {
               throw new Error("Movie not found");
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: { 
                        push: movieId 
                    },
                },
            });

            return res.status(200).json(user);
        }

        if(req.method === "DELETE") {
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const exisitingMovie = await prismadb.user.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!exisitingMovie) {
                throw new Error("Invalid ID | not found");
            }

            const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updateFavoriteIds,
                },
            });

            return res.status(200).json({ updateUser });
        }

        return res.status(405).end();

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }

};