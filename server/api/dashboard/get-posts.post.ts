import UserPost from "~~/server/models/UserPost.model";

export default defineEventHandler(async (event) => {
   
    const body = await readBody(event);
    console.log("Get Posts Running", body)
    let perPage = 10; 
    let page = Math.max(0, body);
    const id:any = await useStorage().getItem("user");
    // const getPosts = await UserPost.find({})
    //   .populate('author', ['username', 'handleName', 'profilePicture'])
    //   ?.populate('reactions', ['reactionType', 'from', 'postReactedTo'])
    //   ?.populate('poll', ['title', 'options', 'votes','votedBy', 'createdAt', 'updatedAt'])
    //   .sort({createdAt: -1})
    //   .skip(perPage * page)
    //   .limit(perPage);

    const getPosts = await UserPost.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'reactionmodels',
          localField: 'reactions',
          foreignField: '_id',
          as: 'reactions'
        }
      },
      {
        $lookup: {
          from: 'pollmodels',
          localField: 'poll',
          foreignField: '_id',
          as: 'poll'
        }
      },
      {$project: {
        _id: 1,
        title: 1,
        body: 1,
        createdAt: 1,
        content: 1,
        media: 1,
        photos: 1,
        views: 1,
        likeCount: 1,
        comments: 1,
        author: {
          $arrayElemAt: ['$author', 0]
        },
        reactions: 1,
        poll: 1
      },},
      {
        $project: {
          _id: 1,
          title: 1,
          body: 1,
          createdAt: 1,
          content: 1,
          media: 1,
          photos: 1,
          views: 1,
          likeCount: 1,
          comments: 1,
          author: {
            username: '$author.username',
            handleName: '$author.handleName',
            profilePicture: '$author.profilePicture'
          },
          reactions: 1,
          poll:  {
            $ifNull: [
              { $cond: { if: { $eq: ['$poll', []] }, then: null, else: { $arrayElemAt: ['$poll', 0] }} },
              null
            ]
          }
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $skip: perPage * page
      },
      {
        $limit: perPage
      }
    ]);
    console.log("Get Posts Ending")
    return getPosts;

})