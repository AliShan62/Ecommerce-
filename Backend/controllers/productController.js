// Import the Product model correctly
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

//Error handler related to tryCatch 
const tryCatchErrorHandler = require('../middleware/catchAsyncError');
const Apifeatures = require('../utils/apifeatures');

//-----------------------------------------
// Controller for creating a new product

// const productCreateController =async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body); // Use the imported Product model

//     res.status(200).send({
//       success: true,
//       message: 'New Product Created Successfully!',
//       product: newProduct, // Optionally send the created product as a response
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: error.message,
//     });
//   }
// }

// Secont way  for creating a new product 
//also it avoid from server crash if error occur 
const productCreateController = tryCatchErrorHandler(async (req, res, next) => {
  // pata chalna chahy k product kiss admin nay create ki ha 
  req.body.user = req.user.id;

  const newProduct = await Product.create(req.body);

  res.status(200).send({
    success: true,
    message: 'New Product Created Successfully!',
    product: newProduct,
  });
});


//------------------------------------

//  Controller For getting All Products
// const productGetController =async (req, res, next) => {
//   try {

//     const AllProducts = await Product.find();
//     res.status(200).send({
//       success: true,
//       message: "Get All Products Successfully!",
//       AllProducts
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(501).send({
//       success: false,
//       message: error.message,
//     })
//   }

// }

//second way 

const productGetController = tryCatchErrorHandler(async (req, res, next) => {

  const resultPerPage = 8;
  const apifeature = new Apifeatures(Product.find(), req.query)

    .search()
    .filter()
    .pagination(resultPerPage)

  //const AllProducts = await Product.find();
  const AllProducts = await apifeature.query;
  if (!AllProducts) {
    // return res.status(404).send({
    //   success: false,
    //   message: "No products found",
    // });
    //second methode 
    return next(new ErrorHandler('Product Not Founded !', 404))
  }


  res.status(200).send({
    success: true,
    message: "Get All Products Successfully!",
    AllProducts,
  });
})

//---------------------------------

//Controller For Update Product
// const productUpdateController = async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id);
//     if (!product) {    // these two Methods are write but efficient is Second

//       // return res.status(404).send({
//       //   success: false,
//       //   message: "Product Not Found!;});

//       //second methode
//       return next(new ErrorHandler('Product Not Founded !', 404))

//     } else {
//       product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//       });
//       res.status(200).send({
//         success: true,
//         message: "Product Updated Successfully!",
//         product
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//second way
const productUpdateController = tryCatchErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(404).send({
    //   success: false,
    //   message: "No products found",
    // });
    //Second way
    return next(new ErrorHandler('Product Not Found!', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).send({
    success: true,
    message: "Product Updated Successfully!",
    product
  });
});

//----------------------------------

//Controller For Delete Product 

// const productDeleteController = async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id);
//     if (!product) {    // these two Methods are write but efficient is Second
//       // return res.status(404).send({
//       //   success: false,
//       //   message: "Product Not Found!"
//       // });

//       //second methode 
//       return next(new ErrorHandler('Product Not Founded !', 404))

//     } else {
//       await product.deleteOne()
//       res.status(200).send({
//         success: true,
//         message: "Product delete Successfully!"

//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const productDeleteController = tryCatchErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(404).send({
    //   success: false,
    //   message: "Product Not Found!"
    // });
    //second way
    return next(new ErrorHandler('Product Not Found!', 404));
  }

  await product.deleteOne();

  res.status(200).send({
    success: true,
    message: "Product deleted Successfully!"
  });
});


//----------------------------------


//Controller For Get Detail of Single  Product  

const GetSingleProductDetailController = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      // return res.status(404).send({
      //   success: false,
      //   message: "Product Not Funded !"
      // })

      //second method efficient
      return next(new ErrorHandler('Unfortunitly! Product Not Founded ', 404))
    }
    else {
      res.status(200).send({
        success: true,
        message: " Get Detail Of Single Porduct Successfully",
        product
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false, 
      message: error.message,
    })
  }
}

// const GetSingleProductDetailController = tryCatchErrorHandler(async (req, res, next) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     // return res.status(404).send({
//     //   success: false,
//     //   message: "Product Not Funded !"
//     // })
 
//     //second method efficient
//     return next(new ErrorHandler('Unfortunately, Product Not Found', 404));
//   } else {
//     res.status(200).send({
//       success: true,
//       message: "Get Detail Of Single Product Successfully",
//       product
//     });
//   }
// });

//---------------------------------------


module.exports = {
  productCreateController,
  productGetController,
  productUpdateController,
  productDeleteController,
  GetSingleProductDetailController,
};
