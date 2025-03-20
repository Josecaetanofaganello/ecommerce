namespace ShopAPI.Models
{
    public class RepairService
    {
        public int Id { get; set; }
        public string NamePtBr { get; set; }
        public string NameEn { get; set; }
        public string DescriptionPtBr { get; set; }
        public string DescriptionEn { get; set; }
        public decimal BasePrice { get; set; }
        public ICollection<RepairOrder> RepairOrders { get; set; }
    }
} 