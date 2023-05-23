import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import { Breadcrumb, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import categoryApi from "@/api/categoryApi";
import images from "@/assets/images";

const cx = classNames.bind(styles);

function Categories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllCategories = async () => {
      setLoading(true);

      try {
        const response = await categoryApi.getAll();

        setCategories(response.data?.data ?? []);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetAllCategories();
  }, []);

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Danh mục</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Danh mục", key: "categories" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả danh mục</h4>
          <Link to={"/admin/categories/create/0"} className={cx("btn", "btn-modern", "btn-dark")}>
            Tạo danh mục
          </Link>
        </div>
        {/* End card header */}

        {/* Table */}
        <Spin spinning={loading}>
          <div className={cx("w-100", "overflow-x-auto")}>
            <table className={cx("table", "table-hover", "bordered-header-only")}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ảnh</th>
                  <th>Tên danh mục</th>
                  <th>Tiêu đề</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr
                    onClick={() => {
                      navigate(`/admin/categories/update/${category.categoryId}`);
                    }}
                    className={cx("cursor-pointer")}
                    key={category.categoryId}
                  >
                    <td>{index + 1}</td>
                    <td className={cx("py-2")}>
                      <img src={category.image || images.placeholder} alt="" />
                    </td>
                    <td>{category.name}</td>
                    <td>{category.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Spin>
        {/* End table */}
      </div>
      {/* ----- End card ----- */}
    </div>
  );
}

export default Categories;
