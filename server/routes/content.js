const express = require("express");
const User = require("../models/User");
const router = express.Router();
const inventspace = require("../models/InventSpace");
const Requirement = require("../models/Requirement");
const Research = require("../models/Research");
const { Op } = require("sequelize");
const Community = require("../models/Community");
const UserCommunity = require("../models/UserCommunity");
const Post = require("../models/Post");
const InventLike = require("../models/InventLike");
const RequirementLike = require("../models/RequirementLike");
const ResearchLike = require("../models/ResearchLike");
const sequelize = require("../src/db");

router.post('/inventlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await InventLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await inventspace.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await InventLike.create({ userId, postId }); // Like
          await inventspace.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.post('/requirementlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await RequirementLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await Requirement.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await RequirementLike.create({ userId, postId }); // Like
          await Requirement.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.post('/researchlike/:postId', async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
      const existingLike = await ResearchLike.findOne({ where: { userId, postId } });
      
      if (existingLike) {
          await existingLike.destroy(); // Unlike
          await Research.decrement('likes', { where: { id: postId } }); // Decrement likes count
          return res.json({ message: 'Unliked' });
      } else {
          await ResearchLike.create({ userId, postId }); // Like
          await Research.increment('likes', { where: { id: postId } }); // Increment likes count
          return res.json({ message: 'Liked' });
      }
      
  } catch (error) {
      res.status(500).json({ error: 'Error processing like' });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  console.log("Search query received: ", query); // Debugging

  try {
    const inventspaceResults = await inventspace.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const requirementResults = await Requirement.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const researchResults = await Research.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const communityResults = await Community.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { subject: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    const results = {
      inventspace: inventspaceResults,
      requirements: requirementResults,
      research: researchResults,
      community: communityResults,
    };

    console.log("Search results found: ", results); // Debugging
    res.status(200).json(results);
  } catch (error) {
    console.error("Error during search: ", error); // Debugging
    res.status(500).json({ error: "An error occurred while searching" });
  }
});

router.post("/post-invent/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await inventspace
    .create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.post("/post-requirement/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await Requirement.create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.post("/post-research/:id", async (req, res) => {
  const { title, description } = req.body;
  const userId = req.params.id;
  console.log("title", title);
  console.log("userId: ", userId);
  await Research.create({ title, description, userId })
    .then((post) => res.status(201).json(post))
    .catch((err) => res.status(500).json(err));
});

router.get('/get-invent', async (req, res) => {
  try {
    let posts = await inventspace.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-requirements", async (req, res) => {
  try {
    let posts = await Requirement.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-research", async (req, res) => {
  try {
    let posts = await Research.findAll();
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-communities", async (req, res) => {
  try {
    let communities = await Community.findAll();
    res.status(201).json(communities);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-top-communities", async (req, res) => {
  try {
    const topCommunities = await Community.findAll({
      include: [
        {
          model: UserCommunity,
          attributes: [], // Exclude fields from the join table
          as: "user_communities", // Ensure correct alias
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("user_communities.userId")),
            "memberCount",
          ], // Use correct alias
        ],
      },
      group: ["community.id"],
      subQuery: false, // Helps in avoiding subquery errors
    });
    res.status(200).json(topCommunities);
  } catch (error) {
    console.error("Error fetching topCommunities: ", error);
    res.status(500).json({ error: error.message });
  }
});

// routes/content.js

router.get("/get-posts-by-community/:communityId", async (req, res) => {
  const { communityId } = req.params;
  try {
    const community = await Community.findByPk(communityId);
    const posts = await Post.findAll({ where: { communityId } });
    res.status(200).json({ community, posts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching community posts" });
  }
});

router.post("/post-in-community/:communityId/:userId", async (req, res) => {
  const { communityId, userId } = req.params;
  const { title, description } = req.body;
  try {
    const post = await Post.create({
      title,
      description,
      communityId,
      userId,
      authorId: userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/post-community", async (req, res) => {
  const { name, description, subject } = req.body;
  console.log("name: ", name);
  console.log("description: ", description);
  console.log("subject: ", subject);
  await Community.create({ name, description, subject })
    .then((com) => res.status(201).json(com))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
