import { Product, Order } from '../types';

class GoogleSheetsService {
  private readonly PRODUCTS_SHEET_ID = '14Nz-tIw34VPR6IYUmVl_6HjGZZS-q7CzhIOUBC9vlX0';
  private readonly ORDERS_SHEET_ID = '1v8BSvIPWlcjct5LG-sm0JFkWc6e_ew59BLVMSXsWp6U';

  private async fetchSheetData(sheetId: string, range: string = 'A:Z'): Promise<any[][]> {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&range=${range}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      return this.parseCSV(csvText);
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  }

  private parseCSV(csvText: string): any[][] {
    const lines = csvText.split('\n');
    const result: any[][] = [];
    
    for (const line of lines) {
      if (line.trim()) {
        const row = this.parseCSVLine(line);
        result.push(row);
      }
    }
    
    return result;
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      const rows = await this.fetchSheetData(this.PRODUCTS_SHEET_ID);
      
      if (rows.length < 2) {
        throw new Error('No product data found');
      }

      // Skip header row
      const dataRows = rows.slice(1);
      const products: Product[] = [];

      for (const row of dataRows) {
        if (row.length < 8) continue; // Skip incomplete rows

        const [
          id,
          name,
          priceStr,
          category,
          description,
          features,
          dimensions,
          material,
          images,
          inStockStr,
          ratingStr,
          reviewsStr
        ] = row;

        // Skip if essential fields are missing
        if (!id || !name || !category) continue;

        // Parse price - skip if blank or invalid
        let price: number;
        if (!priceStr || !priceStr.trim()) {
          continue; // Skip products without price
        }
        
        const cleanPriceStr = priceStr.replace(/[^\d.]/g, '');
        price = parseFloat(cleanPriceStr);
        
        if (isNaN(price) || price <= 0) {
          continue; // Skip products with invalid price
        }

        // Parse features
        const featuresArray = features ? features.split('|').map((f: string) => f.trim()).filter(f => f) : [];

        // Parse images
        const imagesArray = images ? images.split('|').map((img: string) => img.trim()).filter(img => img) : [];
        
        // Ensure at least one image
        if (imagesArray.length === 0) {
          imagesArray.push('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800');
        }

        const product: Product = {
          id: id.toString().trim(),
          name: name.trim(),
          price: price,
          category: category.trim().toLowerCase().replace(/\s+/g, '-'),
          description: description?.trim() || '',
          features: featuresArray,
          dimensions: dimensions?.trim() || 'Custom dimensions available',
          material: material?.trim() || 'Shesham Wood',
          images: imagesArray,
          inStock: inStockStr?.toLowerCase().trim() !== 'false' && inStockStr?.toLowerCase().trim() !== 'no',
          rating: ratingStr && !isNaN(parseFloat(ratingStr)) ? parseFloat(ratingStr) : 4.5,
          reviews: reviewsStr && !isNaN(parseInt(reviewsStr)) ? parseInt(reviewsStr) : 0
        };

        products.push(product);
      }

      console.log(`Loaded ${products.length} products from Google Sheets`);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async fetchOrdersByMobile(mobileNumber: string): Promise<Order[]> {
    try {
      const rows = await this.fetchSheetData(this.ORDERS_SHEET_ID);
      
      if (rows.length < 2) {
        return [];
      }

      // Skip header row
      const dataRows = rows.slice(1);
      const orders: Order[] = [];

      for (const row of dataRows) {
        if (row.length < 6) continue; // Skip incomplete rows

        const [
          orderId,
          mobile,
          customerName,
          items,
          status,
          orderDate,
          estimatedDelivery,
          totalAmountStr,
          imagesStr
        ] = row;

        // Filter by mobile number (clean both for comparison)
        const cleanMobile = mobile?.replace(/\D/g, '').slice(-10); // Get last 10 digits
        const cleanSearchMobile = mobileNumber.replace(/\D/g, '').slice(-10);
        
        if (cleanMobile && cleanMobile === cleanSearchMobile) {
          // Parse total amount
          let totalAmount = 0;
          if (totalAmountStr && totalAmountStr.trim()) {
            const cleanAmount = totalAmountStr.replace(/[^\d.]/g, '');
            totalAmount = parseFloat(cleanAmount) || 0;
          }

          // Parse images
          const imagesArray = imagesStr ? imagesStr.split('|').map((img: string) => img.trim()).filter(img => img) : [];

          const order: Order = {
            id: orderId?.toString().trim() || `ORD${Date.now()}`,
            mobile: mobile?.trim() || '',
            customerName: customerName?.trim() || 'Customer',
            items: items ? items.split('|').map((item: string) => item.trim()).filter(item => item) : [],
            status: status?.trim().toLowerCase() || 'processing',
            orderDate: orderDate?.trim() || new Date().toISOString().split('T')[0],
            estimatedDelivery: estimatedDelivery?.trim() || '2-3 business days',
            totalAmount: totalAmount,
            images: imagesArray
          };

          orders.push(order);
        }
      }

      console.log(`Found ${orders.length} orders for mobile ${mobileNumber}`);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();