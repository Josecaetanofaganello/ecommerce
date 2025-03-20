namespace ShopAPI.Models
{
    public class RepairOrder
    {
        public int Id { get; set; }
        public int RepairServiceId { get; set; }
        public RepairService RepairService { get; set; }
        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string DeviceDescription { get; set; }
        public string Status { get; set; }
    }
} 