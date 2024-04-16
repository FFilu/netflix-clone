import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { currentUser } = await serverAuth(req);

        const favoriteMovies = await prismadb.user.findMany({
            where:{
                id:{ 
                    in: currentUser?.favoriteIds,
                }
            }
        });
        return res.status(200).json(favoriteMovies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}