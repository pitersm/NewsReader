using Microsoft.EntityFrameworkCore.Migrations;

namespace News_Reader.DAL.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeedCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RSSFeeds",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    XMLFileAddress = table.Column<string>(type: "TEXT", nullable: true),
                    CategoryId = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RSSFeeds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RSSFeeds_FeedCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "FeedCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RSSFeeds_CategoryId",
                table: "RSSFeeds",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RSSFeeds");

            migrationBuilder.DropTable(
                name: "FeedCategories");
        }
    }
}
