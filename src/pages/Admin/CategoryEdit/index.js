import classNames from "classnames/bind";
import styles from "./CategoryEdit.module.scss";
import { Breadcrumb, Button, Col, Image, Input, Row, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import TextEditor from "@/components/TextEditor";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/firebase/service";
import categoryApi from "@/api/categoryApi";

const cx = classNames.bind(styles);

function CategoryEdit() {
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [categoryImage, setCategoryImage] = useState({
        image: null,
        preview: "",
    });

    const inputImageRef = useRef();
    const navigate = useNavigate();
    const { action, id } = useParams();

    // ----- Handle input change -----
    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleCategoryTitleChange = (e) => {
        setCategoryTitle(e.target.value);
    };

    const handleCategoryDescChange = (value) => {
        setCategoryDesc(value);
    };

    const handleCategoryImageChange = (e) => {
        if (e.target.files?.length > 0) {
            setCategoryImage({
                image: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0]),
            });
        }
    };
    // ----- End Handle input change -----

    // ----- Handle create -----
    const generateData = async () => {
        const data = {
            name: categoryName,
            title: categoryTitle,
            description: categoryDesc,
            image: categoryImage.image,
        };

        if (data.image && typeof data.image != "string") {
            // Upload image and get image url
            const uploadedImage = await uploadFile(
                data.image,
                "images/categories"
            );
            data.image = uploadedImage.url;
        }

        return data;
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (categoryName) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await categoryApi.create(data);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/categories");
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
        const handleGetCategoryForUpdate = async () => {
            if (action === "update" && id) {
                try {
                    const response = await categoryApi.get(id);
                    const category = response.data.data;

                    console.log(category);
                    setCategoryName(category.name);
                    setCategoryTitle(category.title);
                    setCategoryDesc(category.description);
                    setCategoryImage({
                        image: category.image,
                        preview: category.image,
                    });
                } catch (error) {
                    console.warn(error);
                }
            }
        };
        handleGetCategoryForUpdate();
    }, [action, id]);

    // Update category
    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (action === "update" && id && categoryName) {
            setLoading(true);

            try {
                const data = await generateData();

                const response = await categoryApi.update(id, data);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/categories");
                }, 400);
            } catch (error) {
                console.warn(error);
                setLoading(false);
            }
        }
    };
    // ----- End Handle update -----

    // ----- Handle delete -----
    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        if (action === "update" && id) {
            setLoading(true);

            try {
                const response = await categoryApi.delete(id);

                console.log(response);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/admin/categories");
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
                <h1 className={cx("font-primary", "fw-700")}>Tạo danh mục</h1>
                <Breadcrumb
                    className={cx("d-none", "d-md-block")}
                    items={[
                        {
                            title: (
                                <Link to={"/admin/categories"}>Danh mục</Link>
                            ),
                            key: "categories",
                        },
                        { title: "Tạo danh mục", key: "category-create" },
                    ]}
                />
            </div>
            {/* ----- Page header ----- */}

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    {/* ----- Card ----- */}
                    <div className={cx("card")}>
                        {/* Card header */}
                        <h4 className={cx("card-title", "pb-2")}>
                            Danh mục
                            <span className={cx("card-icon")}>
                                <Unicons.UilAnchor color="#0958d9" size="16" />
                            </span>
                        </h4>
                        {/* End card header */}

                        <form>
                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Tên danh mục
                                </label>
                                <Input
                                    onChange={handleCategoryNameChange}
                                    value={categoryName}
                                    placeholder="Nhập tên danh mục"
                                />
                            </div>

                            <div className={cx("form-group")}>
                                <label
                                    className={cx("form-label", "pt-0", "pb-1")}
                                    htmlFor=""
                                >
                                    Tiêu đề
                                </label>
                                <Input
                                    onChange={handleCategoryTitleChange}
                                    value={categoryTitle}
                                    placeholder="Nhập tiêu đề"
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
                                    onChange={handleCategoryDescChange}
                                    editorState={categoryDesc}
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
                                    onChange={handleCategoryImageChange}
                                    ref={inputImageRef}
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    name=""
                                    id=""
                                    hidden
                                />
                                <Button
                                    onClick={() => {
                                        inputImageRef.current.click();
                                    }}
                                    icon={<Unicons.UilUpload size="14" />}
                                >
                                    <span className={cx("ps-2")}>
                                        Tải ảnh lên
                                    </span>
                                </Button>
                            </div>

                            <div className={cx("pt-5")}>
                                <Spin spinning={loading}>
                                    {action === "update" ? (
                                        <>
                                            <button
                                                onClick={handleUpdateCategory}
                                                className={cx(
                                                    "btn",
                                                    "btn-modern",
                                                    "btn-dark"
                                                )}
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                onClick={handleDeleteCategory}
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
                                            onClick={handleCreateCategory}
                                            className={cx(
                                                "btn",
                                                "btn-modern",
                                                "btn-dark"
                                            )}
                                        >
                                            Tạo danh mục
                                        </button>
                                    )}
                                    <Link
                                        to={"/admin/categories"}
                                        className={cx("btn", "btn-modern")}
                                    >
                                        Huỷ
                                    </Link>
                                </Spin>
                            </div>
                        </form>
                    </div>
                    {/* ----- End card ----- */}
                </Col>
                <Col xs={24} md={8}>
                    {/* ----- Card ----- */}
                    <div className={cx("card")}>
                        {/* Card header */}
                        <div className={cx("pb-2")}>
                            <h4
                                className={cx(
                                    "fs-16",
                                    "fw-600",
                                    "font-primary"
                                )}
                            >
                                Ảnh
                            </h4>
                        </div>
                        {/* End card header */}

                        <Image
                            src={categoryImage.preview || images.placeholder}
                            className={cx("rounded-sm")}
                        />
                    </div>
                    {/* ----- End card ----- */}
                </Col>
            </Row>
        </div>
    );
}

export default CategoryEdit;
