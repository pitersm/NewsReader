using System;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace News_Reader.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RSSFeedController : ControllerBase
    {
        private readonly IRSSFeedService _RSSFeedService;

        public RSSFeedController(IRSSFeedService RSSFeedService)
        {
            _RSSFeedService = RSSFeedService;
        }

        /// <summary>
        /// Gets a list of feeds ordered by name
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<RSSFeedDTO>> List()
        {
            var value = await _RSSFeedService.List();

            return Ok(value);
        }

        /// <summary>
        /// Gets a specific RSSFeed by its unique id
        /// </summary>
        /// <param name="id" example="1">The RSSFeed id</param>
        [HttpGet("{id}")]
        public async Task<ActionResult<RSSFeedDTO>> Get(long id)
        {
            var value = await _RSSFeedService.Get(id);

            if (value != null)
            {
                return Ok(value);
            }
            else
            {
                return NotFound("There is no RSSFeed that matches the Id you informed. Please try again with another Id parameter.");
            }
        }

        // POST api/<controller>
        /// <summary>
        /// Inserts a new RSSFeed in the database
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post(RSSFeedDTO RSSFeed)
        {
            try
            {
                var newRSSFeed = await _RSSFeedService.Create(RSSFeed);
                return new CreatedAtActionResult(nameof(Get), "RSSFeed", new { id = newRSSFeed.Id }, newRSSFeed.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a RSSFeed in the database
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> Put(RSSFeedDTO RSSFeed)
        {
            try
            {
                await _RSSFeedService.Update(RSSFeed);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a RSSFeed in the database
        /// </summary>
        /// <param name="id" example="1">The RSSFeed id</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _RSSFeedService.Delete(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Gets ten news from a single feed
        /// </summary>
        /// <param name="feedId" example="1">The RSSFeed id</param>
        /// <param name="fromDate">Take only news that are only older than this date</param>
        /// <param name="filter">Take only news whose title matches this filter</param>
        //2019-07-26T00:00:00"
        [HttpGet("ListNewsByFeed")]
        public async Task<ActionResult<NewsQueryDTO>> ListNewsByRSSFeed(long feedId, DateTimeOffset? fromDate, string filter)
        {
            var value = await _RSSFeedService.ListNewsByRSSFeed(feedId, fromDate, filter);
            if (value == null)
            {
                return NotFound("There are no news corresponding to the matching filters. Please try again with another set of parameters.");
            }

            return Ok(value);
        }

        /// <summary>
        /// Gets ten news from all feeds in a given category
        /// </summary>
        /// <param name="categoryId" example="1">The FeedCategory id</param>
        /// <param name="fromDate">Take only news that are only older than this date</param>
        /// <param name="filter">Take only news whose title matches this filter</param>
        //2019-07-26T00:00:00"
        [HttpGet("ListByCategory")]
        public ActionResult<NewsQueryDTO> ListNewsByCategory(long categoryId, DateTimeOffset? fromDate, string filter)
        {
            var value = _RSSFeedService.ListNewsByCategory(categoryId, fromDate, filter);
            if (value == null)
            {
                return NotFound("There are no news corresponding to the matching filters. Please try again with another set of parameters.");
            }

            return Ok(value);
        }

        /// <summary>
        /// Gets ten news from all subscribed feeds
        /// </summary>
        /// <param name="fromDate">Take only news that are only older than this date</param>
        /// <param name="filter">Take only news whose title matches this filter</param>
        //2019-07-26T00:00:00"
        [HttpGet("ListFromAllFeeds")]
        public ActionResult<NewsQueryDTO> ListNewsFromAllFeeds(DateTimeOffset? fromDate, string filter)
        {
            var value = _RSSFeedService.ListNews(fromDate, filter);
            if (value == null)
            {
                return NotFound("There are no news corresponding to the matching filters. Please try again with another set of parameters.");
            }

            return Ok(value);
        }
    }
}
