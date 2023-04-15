import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safelistings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safelistings;
    } catch (error: any) {
        throw new Error(error);
    }
}
