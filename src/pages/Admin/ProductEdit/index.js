import classNames from "classnames/bind";
import styles from "./ProductEdit.module.scss";
import {
    Breadcrumb,
    Button,
    Col,
    Divider,
    Image,
    Input,
    Radio,
    Row,
    Select,
    Spin,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import TextEditor from "@/components/TextEditor";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import productApi from "@/api/productApi";
import { uploadFile } from "@/firebase/service";
import categoryApi from "@/api/categoryApi";

const cx = classNames.bind(styles);

function ProductEdit() {
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productIngredients, setProductIngredients] = useState("");
    const [productTaste, setProductTaste] = useState("");
    const [productTexture, setProductTexture] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productAccessories, setProductAccessories] = useState("");
    const [productInstruction, setProductInstruction] = useState("");
    const [productIsDisplay, setProductIsDisplay] = useState(true);
    const [productCategoryId, setProductCategoryId] = useState(null);
    const [productImages, setProductImages] = useState([]);

    const inputImageRef = useRef();
    const navigate = useNavigate();
    const { action, id } = useParams();

    // ----- Load all categories -----
    useEffect(() => {
        const handleGetAllCategories = async () => {
            try {
                const response = await categoryApi.getAll();

                const categories = response.data?.data;

                console.log(categories);

                setAllCategories(
                    categories.map((item) => ({
                        label: item.name,
                        value: item.categoryId + "",
                    }))
                );
            } catch (error) {
                console.warn(error);
            }
        };

        handleGetAllCategories();
    }, []);
    // ----- End Load all categories -----

    // ----- Handle input change -----
    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductDescChange = (value) => {
        setProductDesc(value);
    };

    const handleProductIngredientsChange = (e) => {
        setProductIngredients(e.target.value);
    };

    const handleProductTasteChange = (e) => {
        setProductTaste(e.target.value);
    };

    const handleProductTextureChange = (value) => {
        setProductTexture(value);
    };

    const handleProductSizeChange = (e) => {
        setProductSize(e.target.value);
    };

    const handleProductAccessoriesChange = (value) => {
        setProductAccessories(value);
    };

    const handleProductInstructionChange = (value) => {
        setProductInstruction(value);
    };

    const handleProductIsDisplayChange = (e) => {
        setProductIsDisplay(e.target.value);
    };

    const handleProductCategoryIdChange = (value) => {
        setProductCategoryId(value);
    };
    // ----- End Handle input change -----

    // ----- Handle edit product images -----
    const handleProductImagesChange = (e) => {
        console.log(e.target.files);
        if (e.target?.files?.length > 0) {
            const inputImages = Array.from(e.target.files);

            const resultImages = inputImages.map((image) => {
                return {
                    image: image,
                    preview: URL.createObjectURL(image),
                };
            });

            setProductImages((prev) => [...prev, ...resultImages]);

            console.log(resultImages);
        }
    };

    const handleRemoveProductImage = (image) => {
        setProductImages((prev) =>
            prev.filter((prevImage) => prevImage.preview !== image.preview)
        );
    };
    // ----- End Handle edit product images -----

    // ----- Handle create -----
    const generateData = async () => {
        const data = {
            name: productName,
            price: Number(productPrice),
            ingredients: productIngredients,
            description: productDesc,
            taste: productTaste,
            texture: productTexture,
            size: productSize,
            accessories: productAccessories,
            instructions: productInstruction,
            isDisplay: productIsDisplay,
            categoryId: Number(productCategoryId),
            images: productImages?.map((img) => ({ image: img.image })) ?? [],
        };

        // Upload images and get urls
        const uploadedImages = data.images?.map(async (image) => {
            if (image.image && typeof image.image != "string") {
                var uploadedImage = await uploadFile(
                    image.image,
                    "images/products"
                );
                return {
                    image: uploadedImage.url,
                };
            }

            return image;
        });

        data.images = await Promise.all(uploadedImages);

        return data;
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        if (
            productName &&
            productPrice &&
            productIngredients &&
            productSize &&
            productImages.length > 0
        ) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await productApi.create(data);

                console.log("response: ", response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/products");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle create -----

    // ----- Handle update -----
    useEffect(() => {
        const handleGetProductForUpdate = async () => {
            if (action === "update" && id) {
                try {
                    const response = await productApi.get(id);
                    const product = response.data?.data;
                    console.log(product);

                    setProductName(product.name);
                    setProductPrice(product.price);
                    setProductDesc(product.description);
                    setProductIngredients(product.ingredients);
                    setProductTaste(product.taste);
                    setProductTexture(product.texture);
                    setProductSize(product.size);
                    setProductAccessories(product.accessories);
                    setProductInstruction(product.instructions);
                    setProductIsDisplay(product.isDisplay);
                    setProductCategoryId(
                        product.category?.categoryId + "" ?? null
                    );
                    setProductImages(() => {
                        if (product.images && Array.isArray(product.images)) {
                            return product.images.map((img) => ({
                                image: img.image,
                                preview: img.image,
                            }));
                        }
                    });
                } catch (error) {
                    console.warn(error);
                }
            }
        };

        handleGetProductForUpdate();
    }, [action, id]);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        if (
            action === "update" &&
            id &&
            productName &&
            productPrice &&
            productIngredients &&
            productSize &&
            productImages.length > 0
        ) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await productApi.update(id, data);

                console.log("response: ", response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/products");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle update -----

    // ----- Handle delete -----
    const handleDeleteProduct = async (e) => {
        e.preventDefault();

        if (action === "update" && id) {
            setLoading(true);

            try {
                const response = await productApi.delete(id);

                console.log("response: ", response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/products");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle delete -----

    return (
        <div>
            {/* ----- Page header ----- */}
            <div
                className={cx(
                    "d-flex",
                    "pb-5",
                    "align-items-center",
                    "justify-space-between"
                )}
            >
                <h1 className={cx("font-primary", "fw-700")}>Tạo Sản phẩm</h1>
                <Breadcrumb
                    className={cx("d-none", "d-md-block")}
                    items={[
                        {
                            title: <Link to={"/admin/products"}>Sản phẩm</Link>,
                            key: "categories",
                        },
                        { title: "Tạo sản phẩm", key: "category-create" },
                    ]}
                />
            </div>
            {/* ----- Page header ----- */}

            <form className={cx("w-100")}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                        {/* ----- Card ----- */}
                        <div className={cx("card")}>
                            {/* Card header */}
                            <h4 className={cx("card-title", "pb-2")}>
                                Sản phẩm
                                <span className={cx("card-icon")}>
                                    <Unicons.UilAnchor
                                        color="#0958d9"
                                        size="16"
                                    />
                                </span>
                            </h4>
                            {/* End card header */}

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Tên sản phẩm
                                </label>
                                <Input
                                    onChange={handleProductNameChange}
                                    value={productName}
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Giá bán
                                </label>
                                <Input
                                    onChange={handleProductPriceChange}
                                    value={productPrice}
                                    type="number"
                                    placeholder="Nhập giá bán"
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Mô tả
                                </label>
                                <TextEditor
                                    onChange={handleProductDescChange}
                                    editorState={productDesc}
                                    height={200}
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx(
                                        "form-label",
                                        "pt-2",
                                        "pb-1",
                                        "d-block"
                                    )}
                                    htmlFor=""
                                >
                                    Ảnh
                                </label>
                                <input
                                    onChange={handleProductImagesChange}
                                    ref={inputImageRef}
                                    type="file"
                                    multiple
                                    accept="image/png, image/gif, image/jpeg"
                                    name=""
                                    id=""
                                    hidden
                                />
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (inputImageRef.current) {
                                            inputImageRef.current.click();
                                        }
                                    }}
                                    icon={<Unicons.UilUpload size="14" />}
                                >
                                    <span className={cx("ps-2")}>
                                        Tải ảnh lên
                                    </span>
                                </Button>

                                {/* Products images preview */}
                                {productImages && productImages.length > 0 && (
                                    <div className={cx("mt-4")}>
                                        <Row gutter={[8, 8]}>
                                            {productImages.map(
                                                (image, index) => (
                                                    <Col
                                                        xs={24}
                                                        sm={12}
                                                        md={8}
                                                        key={index}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "product-img-wrap"
                                                            )}
                                                        >
                                                            <Image
                                                                src={
                                                                    image?.preview ||
                                                                    images.placeholder
                                                                }
                                                                className={cx(
                                                                    "product-img"
                                                                )}
                                                            />
                                                            <span
                                                                onClick={() => {
                                                                    handleRemoveProductImage(
                                                                        image
                                                                    );
                                                                }}
                                                                className={cx(
                                                                    "product-img-icon"
                                                                )}
                                                            >
                                                                <Unicons.UilMultiply size="18" />
                                                            </span>
                                                        </div>
                                                    </Col>
                                                )
                                            )}
                                        </Row>
                                    </div>
                                )}
                                {/* End Products images preview */}
                            </div>
                        </div>
                        {/* ----- End card ----- */}

                        <div className={cx("card", "mt-4")}>
                            {/* Card header */}
                            <h4 className={cx("card-title", "pb-2")}>
                                Thành phần & hương vị
                                <span className={cx("card-icon")}>
                                    <Unicons.UilAnchor
                                        color="#0958d9"
                                        size="16"
                                    />
                                </span>
                            </h4>
                            {/* End card header */}

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Thành phần
                                </label>
                                <Input
                                    onChange={handleProductIngredientsChange}
                                    value={productIngredients}
                                    placeholder="Nhập thành phần"
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Cảm giác bánh
                                </label>
                                <Input
                                    onChange={handleProductTasteChange}
                                    value={productTaste}
                                    placeholder="Nhập cảm giác bánh"
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Cấu trúc vị bánh
                                </label>
                                <TextEditor
                                    onChange={handleProductTextureChange}
                                    editorState={productTexture}
                                    height={200}
                                />
                            </div>
                        </div>

                        <div className={cx("card", "mt-4")}>
                            {/* Card header */}
                            <h4 className={cx("card-title", "pb-2")}>
                                Thông tin
                                <span className={cx("card-icon")}>
                                    <Unicons.UilAnchor
                                        color="#0958d9"
                                        size="16"
                                    />
                                </span>
                            </h4>
                            {/* End card header */}

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Kích thước
                                </label>
                                <Input
                                    onChange={handleProductSizeChange}
                                    value={productSize}
                                    placeholder="Nhập kích thước"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Phụ kiện tặng kèm
                                </label>
                                <TextEditor
                                    onChange={handleProductAccessoriesChange}
                                    editorState={productAccessories}
                                    height={200}
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-2", "pb-1")}
                                    htmlFor=""
                                >
                                    Hướng dẫn sử dụng
                                </label>
                                <TextEditor
                                    onChange={handleProductInstructionChange}
                                    editorState={productInstruction}
                                    height={200}
                                />
                            </div>

                            <div className={cx("pt-5")}>
                                <Spin spinning={loading}>
                                    {action === "update" ? (
                                        <>
                                            <button
                                                onClick={handleUpdateProduct}
                                                className={cx(
                                                    "btn",
                                                    "btn-modern",
                                                    "btn-dark"
                                                )}
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                onClick={handleDeleteProduct}
                                                className={cx(
                                                    "btn",
                                                    "btn-modern",
                                                    "btn-warning"
                                                )}
                                            >
                                                Xoá
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleCreateProduct}
                                            className={cx(
                                                "btn",
                                                "btn-modern",
                                                "btn-dark"
                                            )}
                                        >
                                            Tạo sản phẩm
                                        </button>
                                    )}
                                    <Link
                                        to={"/admin/products"}
                                        className={cx("btn", "btn-modern")}
                                    >
                                        Huỷ
                                    </Link>
                                </Spin>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        {/* ----- Card ----- */}
                        <div className={cx("card")}>
                            {/* Card header */}
                            <h4 className={cx("card-title", "pb-2")}>
                                Trạng thái hiển thị
                                <span className={cx("card-icon")}>
                                    <Unicons.UilAnchor
                                        color="#0958d9"
                                        size="16"
                                    />
                                </span>
                            </h4>
                            {/* End card header */}

                            <Radio.Group
                                onChange={handleProductIsDisplayChange}
                                value={productIsDisplay}
                            >
                                <Radio
                                    value={true}
                                    className={cx("d-block", "font-primary")}
                                >
                                    Hiển thị
                                </Radio>
                                <Radio
                                    value={false}
                                    className={cx(
                                        "d-block",
                                        "font-primary",
                                        "mt-2"
                                    )}
                                >
                                    Ẩn
                                </Radio>
                            </Radio.Group>

                            <Divider />

                            <h4 className={cx("card-title", "pb-2")}>
                                Phân loại
                                <span className={cx("card-icon")}>
                                    <Unicons.UilAnchor
                                        color="#0958d9"
                                        size="16"
                                    />
                                </span>
                            </h4>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx(
                                        "form-label",
                                        "pt-0",
                                        "pb-1",
                                        "d-block"
                                    )}
                                    htmlFor=""
                                >
                                    Danh mục
                                </label>
                                <Select
                                    onChange={handleProductCategoryIdChange}
                                    value={productCategoryId}
                                    className={cx("w-100")}
                                    options={allCategories}
                                    placeholder="Chọn danh mục"
                                />
                            </div>
                        </div>
                        {/* ----- End card ----- */}
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default ProductEdit;
