namespace ShopAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string NamePtBr { get; set; }
        public string NameEn { get; set; }
        public string DescriptionPtBr { get; set; }
        public string DescriptionEn { get; set; }
        public ICollection<Product> Products { get; set; }
    }
} 