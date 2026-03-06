// Admin mock data — inventory, repairs, customers, chart data

export const inventoryItems = [
    { id: 1, name: 'iPhone 15 Pro', sku: 'APL-IP15P-256', category: 'iphones', price: 129900, stock: 45, status: 'In Stock', image: '📱' },
    { id: 2, name: 'Samsung Galaxy S23 Ultra', sku: 'SAM-S23U-256', category: 'android', price: 109999, stock: 32, status: 'In Stock', image: '📱' },
    { id: 3, name: 'AirPods Pro 2nd Gen', sku: 'APL-APP2-STD', category: 'audio', price: 24900, stock: 78, status: 'In Stock', image: '🎧' },
    { id: 4, name: 'iPhone 13 Midnight', sku: 'APL-IP13-128', category: 'iphones', price: 47990, stock: 5, status: 'Low Stock', image: '📱' },
    { id: 5, name: 'OnePlus 12', sku: 'OPL-OP12-256', category: 'android', price: 64999, stock: 22, status: 'In Stock', image: '📱' },
    { id: 6, name: 'Apple Watch Series 9', sku: 'APL-AW9-41', category: 'watches', price: 41900, stock: 0, status: 'Out of Stock', image: '⌚' },
    { id: 7, name: 'Anker 65W GaN Charger', sku: 'ANK-65G-BLK', category: 'chargers', price: 2999, stock: 120, status: 'In Stock', image: '🔌' },
    { id: 8, name: 'Nothing Phone (2)', sku: 'NTH-NP2-256', category: 'android', price: 44999, stock: 3, status: 'Low Stock', image: '📱' },
    { id: 9, name: 'Sony WH-1000XM5', sku: 'SNY-XM5-BLK', category: 'audio', price: 29990, stock: 18, status: 'In Stock', image: '🎧' },
    { id: 10, name: 'Spigen Tough Armor Case', sku: 'SPG-TA-IP15P', category: 'cases', price: 1499, stock: 200, status: 'In Stock', image: '🛡️' },
    { id: 11, name: 'Google Pixel 8 Pro', sku: 'GOG-PX8P-256', category: 'android', price: 99999, stock: 15, status: 'In Stock', image: '📱' },
    { id: 12, name: 'Belkin 3-in-1 MagSafe', sku: 'BLK-3N1-WHT', category: 'chargers', price: 9990, stock: 8, status: 'Low Stock', image: '🔌' },
]

export const repairOrders = [
    { id: 'BTC-100001', customer: 'Arun Patel', device: 'iPhone 14 Pro', issue: 'Cracked Screen', tech: 'Ravi Kumar', status: 'In Progress', eta: '30 mins', phone: '+91 98765 43210', createdAt: '2024-01-15 10:30 AM' },
    { id: 'BTC-100002', customer: 'Sneha Gupta', device: 'Samsung S23', issue: 'Battery Replacement', tech: 'Amit Singh', status: 'Completed', eta: '-', phone: '+91 87654 32109', createdAt: '2024-01-15 09:00 AM' },
    { id: 'BTC-100003', customer: 'Vikram Joshi', device: 'iPhone 13', issue: 'Water Damage', tech: 'Ravi Kumar', status: 'Pending', eta: '2 hours', phone: '+91 76543 21098', createdAt: '2024-01-15 11:00 AM' },
    { id: 'BTC-100004', customer: 'Meera Reddy', device: 'OnePlus 11', issue: 'Camera Lens', tech: 'Priya Das', status: 'In Progress', eta: '45 mins', phone: '+91 65432 10987', createdAt: '2024-01-14 04:30 PM' },
    { id: 'BTC-100005', customer: 'Rohit Sharma', device: 'iPhone 15 Pro', issue: 'Back Glass', tech: 'Amit Singh', status: 'Pending', eta: '1 hour', phone: '+91 54321 09876', createdAt: '2024-01-14 03:00 PM' },
    { id: 'BTC-100006', customer: 'Ananya Desai', device: 'Pixel 7', issue: 'Cracked Screen', tech: 'Ravi Kumar', status: 'Completed', eta: '-', phone: '+91 43210 98765', createdAt: '2024-01-14 01:00 PM' },
    { id: 'BTC-100007', customer: 'Karan Malhotra', device: 'Samsung S22', issue: 'Charging Port', tech: 'Priya Das', status: 'In Progress', eta: '20 mins', phone: '+91 32109 87654', createdAt: '2024-01-14 11:30 AM' },
    { id: 'BTC-100008', customer: 'Divya Nair', device: 'iPhone 12', issue: 'Battery Replacement', tech: 'Amit Singh', status: 'Cancelled', eta: '-', phone: '+91 21098 76543', createdAt: '2024-01-13 05:00 PM' },
    { id: 'BTC-100009', customer: 'Suresh Iyer', device: 'Nothing Phone 2', issue: 'Display Issue', tech: 'Ravi Kumar', status: 'Pending', eta: '3 hours', phone: '+91 10987 65432', createdAt: '2024-01-13 02:30 PM' },
    { id: 'BTC-100010', customer: 'Pooja Kapoor', device: 'iPhone 14', issue: 'Speaker Issue', tech: 'Priya Das', status: 'In Progress', eta: '1 hour', phone: '+91 09876 54321', createdAt: '2024-01-13 10:00 AM' },
    { id: 'BTC-100011', customer: 'Nitin Agarwal', device: 'Samsung A54', issue: 'Cracked Screen', tech: 'Amit Singh', status: 'Completed', eta: '-', phone: '+91 98761 23456', createdAt: '2024-01-12 04:00 PM' },
    { id: 'BTC-100012', customer: 'Rekha Menon', device: 'iPhone 15', issue: 'Water Damage', tech: 'Ravi Kumar', status: 'In Progress', eta: '2 hours', phone: '+91 87651 23456', createdAt: '2024-01-12 01:00 PM' },
    { id: 'BTC-100013', customer: 'Amit Thakur', device: 'Moto Edge 40', issue: 'Battery Replacement', tech: 'Priya Das', status: 'Pending', eta: '45 mins', phone: '+91 76541 23456', createdAt: '2024-01-12 09:30 AM' },
    { id: 'BTC-100014', customer: 'Shruti Bhat', device: 'iPhone 13 Pro', issue: 'Camera Lens', tech: 'Amit Singh', status: 'Completed', eta: '-', phone: '+91 65431 23456', createdAt: '2024-01-11 03:00 PM' },
    { id: 'BTC-100015', customer: 'Rajesh Kumar', device: 'Xiaomi 14', issue: 'Cracked Screen', tech: 'Ravi Kumar', status: 'Pending', eta: '1 hour', phone: '+91 54321 23456', createdAt: '2024-01-11 11:00 AM' },
]

export const customers = [
    { id: 1, name: 'Arun Patel', phone: '+91 98765 43210', email: 'arun.patel@gmail.com', orders: 12, totalSpent: 345000, lastActive: '2 hours ago', avatar: 'AP' },
    { id: 2, name: 'Sneha Gupta', phone: '+91 87654 32109', email: 'sneha.g@gmail.com', orders: 8, totalSpent: 189000, lastActive: '1 day ago', avatar: 'SG' },
    { id: 3, name: 'Vikram Joshi', phone: '+91 76543 21098', email: 'vikram.j@gmail.com', orders: 5, totalSpent: 92000, lastActive: '3 days ago', avatar: 'VJ' },
    { id: 4, name: 'Meera Reddy', phone: '+91 65432 10987', email: 'meera.r@gmail.com', orders: 15, totalSpent: 478000, lastActive: '5 hours ago', avatar: 'MR' },
    { id: 5, name: 'Rohit Sharma', phone: '+91 54321 09876', email: 'rohit.s@gmail.com', orders: 3, totalSpent: 54000, lastActive: '1 week ago', avatar: 'RS' },
    { id: 6, name: 'Ananya Desai', phone: '+91 43210 98765', email: 'ananya.d@gmail.com', orders: 20, totalSpent: 620000, lastActive: '30 mins ago', avatar: 'AD' },
    { id: 7, name: 'Karan Malhotra', phone: '+91 32109 87654', email: 'karan.m@gmail.com', orders: 7, totalSpent: 156000, lastActive: '2 days ago', avatar: 'KM' },
    { id: 8, name: 'Divya Nair', phone: '+91 21098 76543', email: 'divya.n@gmail.com', orders: 11, totalSpent: 289000, lastActive: '6 hours ago', avatar: 'DN' },
    { id: 9, name: 'Suresh Iyer', phone: '+91 10987 65432', email: 'suresh.i@gmail.com', orders: 4, totalSpent: 78000, lastActive: '4 days ago', avatar: 'SI' },
    { id: 10, name: 'Pooja Kapoor', phone: '+91 09876 54321', email: 'pooja.k@gmail.com', orders: 9, totalSpent: 234000, lastActive: '1 day ago', avatar: 'PK' },
    { id: 11, name: 'Nitin Agarwal', phone: '+91 98761 23456', email: 'nitin.a@gmail.com', orders: 6, totalSpent: 112000, lastActive: '3 days ago', avatar: 'NA' },
    { id: 12, name: 'Rekha Menon', phone: '+91 87651 23456', email: 'rekha.m@gmail.com', orders: 14, totalSpent: 445000, lastActive: '1 hour ago', avatar: 'RM' },
    { id: 13, name: 'Amit Thakur', phone: '+91 76541 23456', email: 'amit.t@gmail.com', orders: 2, totalSpent: 35000, lastActive: '5 days ago', avatar: 'AT' },
    { id: 14, name: 'Shruti Bhat', phone: '+91 65431 23456', email: 'shruti.b@gmail.com', orders: 10, totalSpent: 267000, lastActive: '4 hours ago', avatar: 'SB' },
    { id: 15, name: 'Rajesh Kumar', phone: '+91 54321 23456', email: 'rajesh.k@gmail.com', orders: 18, totalSpent: 523000, lastActive: '2 hours ago', avatar: 'RK' },
    { id: 16, name: 'Nisha Patel', phone: '+91 43211 23456', email: 'nisha.p@gmail.com', orders: 1, totalSpent: 24900, lastActive: '1 week ago', avatar: 'NP' },
    { id: 17, name: 'Deepak Rao', phone: '+91 32101 23456', email: 'deepak.r@gmail.com', orders: 13, totalSpent: 398000, lastActive: '3 hours ago', avatar: 'DR' },
    { id: 18, name: 'Kavita Singh', phone: '+91 21091 23456', email: 'kavita.s@gmail.com', orders: 7, totalSpent: 167000, lastActive: '2 days ago', avatar: 'KS' },
    { id: 19, name: 'Manish Gupta', phone: '+91 10981 23456', email: 'manish.g@gmail.com', orders: 5, totalSpent: 89000, lastActive: '6 days ago', avatar: 'MG' },
    { id: 20, name: 'Swati Jain', phone: '+91 09871 23456', email: 'swati.j@gmail.com', orders: 16, totalSpent: 512000, lastActive: '45 mins ago', avatar: 'SJ' },
]

export const salesChartData = [
    { day: 'Mon', sales: 42000, repairs: 8 },
    { day: 'Tue', sales: 38000, repairs: 12 },
    { day: 'Wed', sales: 55000, repairs: 6 },
    { day: 'Thu', sales: 47000, repairs: 15 },
    { day: 'Fri', sales: 68000, repairs: 10 },
    { day: 'Sat', sales: 82000, repairs: 18 },
    { day: 'Sun', sales: 61000, repairs: 9 },
]

export const revenueChartData = [
    { date: 'Jan 1', revenue: 245000 },
    { date: 'Jan 5', revenue: 312000 },
    { date: 'Jan 10', revenue: 289000 },
    { date: 'Jan 15', revenue: 478000 },
    { date: 'Jan 20', revenue: 356000 },
    { date: 'Jan 25', revenue: 523000 },
    { date: 'Jan 30', revenue: 445000 },
]

export const categoryBreakdown = [
    { name: 'iPhones', value: 42, fill: '#4b1d95' },
    { name: 'Android', value: 28, fill: '#6d28d9' },
    { name: 'Audio', value: 12, fill: '#8b5cf6' },
    { name: 'Watches', value: 8, fill: '#a78bfa' },
    { name: 'Chargers', value: 6, fill: '#c4b5fd' },
    { name: 'Cases', value: 4, fill: '#ddd6fe' },
]

export const topProducts = [
    { rank: 1, name: 'iPhone 15 Pro', units: 234, revenue: 3041160 },
    { rank: 2, name: 'AirPods Pro 2', units: 189, revenue: 4706100 },
    { rank: 3, name: 'Samsung Galaxy S23 Ultra', units: 156, revenue: 17159844 },
    { rank: 4, name: 'Apple Watch Series 9', units: 112, revenue: 4692800 },
    { rank: 5, name: 'Anker 65W GaN', units: 345, revenue: 1034655 },
]

export const repairVolumeData = [
    { type: 'Screen', count: 45 },
    { type: 'Battery', count: 32 },
    { type: 'Water', count: 18 },
    { type: 'Camera', count: 15 },
    { type: 'Charging', count: 12 },
    { type: 'Speaker', count: 8 },
]

export const activityFeed = [
    { icon: 'shopping_bag', title: 'New Order #BABA-99301', subtitle: 'iPhone 15 Pro + AirPods Pro', time: '2 mins ago', color: 'bg-primary' },
    { icon: 'build', title: 'Repair Status Updated', subtitle: 'BTC-100001 → In Progress', time: '15 mins ago', color: 'bg-blue-500' },
    { icon: 'inventory_2', title: 'Inventory Alert', subtitle: 'iPhone 13 — Only 5 units left', time: '1 hour ago', color: 'bg-warning' },
    { icon: 'person_add', title: 'New Customer', subtitle: 'Swati Jain registered', time: '2 hours ago', color: 'bg-success' },
    { icon: 'local_shipping', title: 'Parts Shipped', subtitle: 'Screen panels order dispatched', time: '3 hours ago', color: 'bg-purple-400' },
]

export const deploymentHistory = [
    { id: 1, timestamp: '2024-01-15 10:30 AM', deployer: 'Admin', environment: 'Production', commit: 'a3f2b1c', status: 'Success' },
    { id: 2, timestamp: '2024-01-14 03:45 PM', deployer: 'Admin', environment: 'Staging', commit: 'b4e3c2d', status: 'Success' },
    { id: 3, timestamp: '2024-01-13 09:15 AM', deployer: 'Dev Team', environment: 'Development', commit: 'c5f4d3e', status: 'Success' },
    { id: 4, timestamp: '2024-01-12 06:00 PM', deployer: 'Admin', environment: 'Production', commit: 'd6g5e4f', status: 'Failed' },
    { id: 5, timestamp: '2024-01-11 11:30 AM', deployer: 'Admin', environment: 'Production', commit: 'e7h6f5g', status: 'Success' },
]

export const repairBrands = ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Nothing', 'Motorola']

export const repairModels = {
    Apple: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone 12'],
    Samsung: ['Galaxy S23 Ultra', 'Galaxy S23', 'Galaxy S22', 'Galaxy A54', 'Galaxy A34'],
    OnePlus: ['OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus Nord 3'],
    Google: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7'],
    Xiaomi: ['Xiaomi 14 Ultra', 'Xiaomi 13 Pro', 'Redmi Note 13 Pro'],
    Nothing: ['Nothing Phone (2)', 'Nothing Phone (1)'],
    Motorola: ['Edge 40 Pro', 'Edge 30 Ultra', 'Razr 40 Ultra'],
}

export const repairIssues = [
    { name: 'Screen Replacement', basePrice: 2499 },
    { name: 'Battery Swap', basePrice: 999 },
    { name: 'Water Damage Repair', basePrice: 1499 },
    { name: 'Camera Lens Repair', basePrice: 1199 },
    { name: 'Charging Port Repair', basePrice: 799 },
    { name: 'Speaker Repair', basePrice: 699 },
    { name: 'Back Glass Replacement', basePrice: 1999 },
]
