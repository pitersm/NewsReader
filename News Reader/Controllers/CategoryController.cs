using System;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace News_Reader.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Gets a list of categories ordered by name
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<CategoryDTO>> List()
        {
            var value = await _categoryService.List();

            return Ok(value);
        }

        /// <summary>
        /// Gets a specific category by its unique id
        /// </summary>
        /// <param name="id" example="1">The category id</param>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> Get(long id)
        {
            var value = await _categoryService.Get(id);

            if (value != null)
            {
                return Ok(value);
            }
            else
            {
                return NotFound("There is no category that matches the Id you informed. Please try again with another Id parameter.");
            }
        }

        // POST api/<controller>
        /// <summary>
        /// Inserts a new category in the database
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post(CategoryDTO category)
        {
            try
            {
                var newCategory = await _categoryService.Create(category);
                return new CreatedAtActionResult(nameof(Get), "Category", new { id = newCategory.Id }, newCategory.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a category in the database
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> Put(CategoryDTO category)
        {
            try
            {
                await _categoryService.Update(category);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a category in the database
        /// </summary>
        /// <param name="id" example="1">The category id</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _categoryService.Delete(id);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
