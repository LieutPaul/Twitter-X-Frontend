import React from 'react'
import TrendsBlock from './TrendsBlock'
import { useNavigate } from 'react-router-dom';
import { getAllTweets } from '../../TweetAPIs';


function isWithin24Hours(createdAt) {
	const currentTime = new Date();
	const createdAtTime = new Date(createdAt);
	const timeDiffInMilliseconds = currentTime - createdAtTime;
	return timeDiffInMilliseconds <= 86400000; 
}

function findTrendingTweets(tweets, topN = 10) {
	const hashtagCounts = {};
	for (const tweet of tweets) {
		if (isWithin24Hours(tweet.createdAt)) {
			const words = tweet.content.split(/\s+/);
			const hashtags = words.filter(word => /^#\w+$/i.test(word));
	
			for (const hashtag of hashtags) {
				hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;
			}
		}
	}
	const trendingHashtags = Object.entries(hashtagCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, topN)
		.map(entry => ({ hashtag: entry[0], count: entry[1] }));

	return trendingHashtags;
  }

export default function RightBar() {

	const [trendingHashtags,setTrendingHashtags] = React.useState([]);
	const [tweets,setTweets] = React.useState([]);
	const navigate = useNavigate();
  
	React.useEffect(() => {
		async function getTweets() {
			const tempTweets = await getAllTweets(setTweets);
			if (tempTweets == null) {
				navigate("/login");
			}
			setTrendingHashtags(findTrendingTweets(tempTweets));
		}
		getTweets();
	}, [navigate]);

	return (
		<div className='col-4 flex justify-center mt-4 right-bar-container'>
			<div className='right-bar fixed w-[350px]'>
				<div className='trends rounded-[15px] bg-[#f5f8fa]'>
					<div className='font-black text-lg trends-heading pt-[20px] pb-[10px] ps-[15px] pe-[15px] mb-2'>
					What's Happening?
					</div>
					
					{
						trendingHashtags.map((trendingHashtag, index) => {
							return (<TrendsBlock key={index} name={trendingHashtag.hashtag} tweets={trendingHashtag.count}/>);
						})
					}

				</div>
			</div>
		</div>
	)
}
