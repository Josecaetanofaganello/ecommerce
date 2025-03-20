using System;

namespace ShopAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string NamePtBr { get; set; }
        public string NameEn { get; set; }
        public string DescriptionPtBr { get; set; }
        public string DescriptionEn { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string ImageUrl { get; set; }
        public bool IsAvailable { get; set; }
    }
} 