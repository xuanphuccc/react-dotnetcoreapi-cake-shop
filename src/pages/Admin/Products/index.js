import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Breadcrumb, Button, Collapse, Empty, Input, Pagination, Popover, Radio, Space, Spin, Tag } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import images from "@/assets/images";
import productApi from "@/api/productApi";
import currencyConvert from "@/services/currencyConvert";
import { debounce } from "lodash";
import categoryApi from "@/api/categoryApi";

const cx = classNames.bind(styles);
const { Panel } = Collapse;

function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);

  const [queryParams, setQueryParams] = useSearchParams();
  const [allQueryParams, setAllQueryParams] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const pageSize = 10;
    const page = queryParams.get("page");
    const search = queryParams.get("search");
    const sort = queryParams.get("sort");
    const category = queryParams.get("category");

    // Get all products
    const handleGetAllProducts = async () => {
      setLoading(true);

      try {
        var response = await productApi.getAll({
          category,
          pageSize,
          page: page || 1,
          search,
          sort,
        });

        setProducts(response.data?.data ?? []);
        setTotalPages(response.data?.totalPage * 10 || 1);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.warn(error);
      }
    };
    handleGetAllProducts();

    // Get all categories
    const handleGetAllCategories = async () => {
      try {
        const response = await categoryApi.getAll();

        setCategories(response.data?.data ?? []);
      } catch (error) {
        console.warn(error);
      }
    };
    handleGetAllCategories();
  }, [queryParams]);

  // --------- Filter change ---------
  // Get all query params
  useEffect(() => {
    const allParams = {};
    queryParams.forEach((value, key) => {
      allParams[key] = value;
    });

    setAllQueryParams(allParams);
  }, [queryParams]);

  // Delay search
  const handleDebounceSearch = useMemo(() => {
    return debounce((value) => {
      setQueryParams({ ...allQueryParams, search: value });
    }, 1000);
  }, [setQueryParams, allQueryParams]);

  const handleSearchParamChange = (e) => {
    handleDebounceSearch(e.target.value);
  };

  const handleSortParamChange = (e) => {
    let value = e.target.value;
    setQueryParams({ ...allQueryParams, sort: value });
  };

  const handleCategoryParamChange = (e) => {
    let value = e.target.value;
    setQueryParams({ ...allQueryParams, category: value });
  };

  const handlePageParamChange = (page) => {
    setQueryParams({ ...allQueryParams, page: page });
  };
  // --------- End Filter change ---------

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Sản phẩm</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Sản phẩm", key: "products" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả sản phẩm</h4>
          <Link to={"/admin/products/create/0"} className={cx("btn", "btn-modern", "btn-dark")}>
            Tạo sản phẩm
          </Link>
        </div>
        {/* End card header */}

        {/* Search and filter */}
        <div className={cx("w-100", "pt-2", "pb-2")}>
          <Space.Compact block>
            <Input onChange={handleSearchParamChange} placeholder="Tìm kiếm" prefix={<Unicons.UilSearch size="16" />} />
            <Popover
              title="Filter"
              placement="bottom"
              trigger="click"
              content={
                <>
                  <Collapse defaultActiveKey={1} size="small" ghost accordion expandIconPosition="end">
                    <Panel header="Danh mục" key="1">
                      <Radio.Group onChange={handleCategoryParamChange}>
                        <Space size="small" direction="vertical">
                          {categories.map((category) => (
                            <Radio key={category.categoryId} value={category.categoryId}>
                              {category.name}
                            </Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </Panel>

                    <Panel header="Sắp xếp" key="2">
                      <Radio.Group onChange={handleSortParamChange}>
                        <Space size="small" direction="vertical">
                          <Radio value={"creationTimeDesc"}>Mới hơn</Radio>
                          <Radio value={"creationTimeAsc"}>Cũ hơn</Radio>
                          <Radio value={"nameAsc"}>Tên A - Z</Radio>
                          <Radio value={"nameDesc"}>Tên Z - A</Radio>
                        </Space>
                      </Radio.Group>
                    </Panel>
                  </Collapse>
                </>
              }
            >
              <Button className={cx("d-flex", "align-items-center")} icon={<Unicons.UilFilter size="16" />}>
                <span className={cx("ps-1")}>Filter</span>
              </Button>
            </Popover>
          </Space.Compact>
        </div>
        {/* End Search and filter */}

        {/* Table */}
        <Spin spinning={loading}>
          <div className={cx("w-100", "overflow-x-auto")}>
            <table className={cx("table", "table-hover", "bordered-header-only")}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Đã bán</th>
                  <th>Trạng thái</th>
                  <th>Danh mục</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr
                    onClick={() => {
                      navigate(`/admin/products/update/${product.productId}`);
                    }}
                    className={cx("cursor-pointer")}
                    key={product.productId}
                  >
                    <td>{index + 1}</td>
                    <td className={cx("py-2")}>
                      <img src={product?.images[0]?.image || images.placeholder} alt="" />
                    </td>
                    <td>{product.name}</td>
                    <td>{currencyConvert(product.price)}</td>
                    <td>{product.hasOrders}</td>
                    <td>{product.isDisplay ? <Tag color="cyan">Đang bán</Tag> : <Tag color="default">Đã ẩn</Tag>}</td>
                    <td>{product?.category?.name || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </div>
        </Spin>
        {/* End table */}

        {/* Paging */}
        <div className={cx("mt-4", "d-flex", "justify-end", "align-items-center", "pagination")}>
          <Pagination
            current={queryParams.get("page") || 1}
            onChange={handlePageParamChange}
            total={totalPages}
            size="small"
            simple
          />
        </div>
      </div>
      {/* ----- End card ----- */}
    </div>
  );
}

export default Products;
